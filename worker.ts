export interface Env {
  OPENWEATHER_API_KEY: string;
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

function looksLikeFile(pathname: string) {
  return /\.[a-zA-Z0-9]+$/.test(pathname);
}

function requireKey(env: { OPENWEATHER_API_KEY?: string }) {
  const key = env.OPENWEATHER_API_KEY?.trim();
  if (!key) throw new Error("Missing OPENWEATHER_API_KEY secret");
  return key;
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // ---- /api/weather (lat/lon) ----
    if (url.pathname === "/api/weather") {
      try {
        const key = requireKey(env);

        const lat = url.searchParams.get("lat");
        const lon = url.searchParams.get("lon");
        const units = url.searchParams.get("units") ?? "metric";

        if (!lat || !lon) {
          return jsonResponse({ error: "Missing lat/lon" }, 400);
        }

        const upstream = new URL("https://api.openweathermap.org/data/2.5/weather");
        upstream.searchParams.set("lat", lat);
        upstream.searchParams.set("lon", lon);
        upstream.searchParams.set("units", units);
        upstream.searchParams.set("appid", key);

        const res = await fetch(upstream.toString());
        const headers = new Headers(res.headers);
        headers.set("x-proxy", "cloudflare-worker");

        return new Response(res.body, { status: res.status, headers });
      } catch (e) {
        return jsonResponse(
          { error: e instanceof Error ? e.message : "Worker error" },
          500
        );
      }
    }

    // ---- /api/geocode (q, limit) ----
    if (url.pathname === "/api/geocode") {
      try {
        const key = requireKey(env);

        const q = url.searchParams.get("q");
        const limit = url.searchParams.get("limit") ?? "3";

        if (!q) {
          return jsonResponse({ error: "Missing ?q=" }, 400);
        }

        const upstream = new URL("https://api.openweathermap.org/geo/1.0/direct");
        upstream.searchParams.set("q", q);
        upstream.searchParams.set("limit", limit);
        upstream.searchParams.set("appid", key);

        const res = await fetch(upstream.toString());
        const headers = new Headers(res.headers);
        headers.set("x-proxy", "cloudflare-worker");

        return new Response(res.body, { status: res.status, headers });
      } catch (e) {
        return jsonResponse(
          { error: e instanceof Error ? e.message : "Worker error" },
          500
        );
      }
    }

    // ---- Static assets + SPA fallback ----
    // Serve built files from dist via assets binding
    const assetRes = await env.ASSETS.fetch(request);

    // If the asset exists, return it (keeps correct JS/CSS MIME types)
    if (assetRes.status !== 404) return assetRes;

    // If it's a file request and missing, return the 404 (don't SPA-fallback)
    if (looksLikeFile(url.pathname)) return assetRes;

    // SPA fallback for client-side routes (no extension)
    const indexUrl = new URL(request.url);
    indexUrl.pathname = "/index.html";
    return env.ASSETS.fetch(new Request(indexUrl.toString(), request));
  },
};
