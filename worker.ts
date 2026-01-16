export interface Env {
  OPENWEATHER_API_KEY: string;
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

function looksLikeFile(pathname: string) {
  return /\.[a-zA-Z0-9]+$/.test(pathname);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/weather") {
      const lat = url.searchParams.get("lat");
      const lon = url.searchParams.get("lon");
      const units = url.searchParams.get("units") ?? "metric";

      if (!lat || !lon) {
        return new Response(JSON.stringify({ error: "Missing lat/lon" }), {
          status: 400,
          headers: { "content-type": "application/json" },
        });
      }

      const upstream = new URL(
        "https://api.openweathermap.org/data/2.5/weather"
      );
      upstream.searchParams.set("q", city);
      upstream.searchParams.set("appid", env.OPENWEATHER_API_KEY);

      const res = await fetch(upstream.toString());
      return new Response(res.body, {
        status: res.status,
        headers: {
          "content-type": res.headers.get("content-type") ?? "application/json",
        },
      });
    }

    if (url.pathname === "/api/geocode") {
      const q = url.searchParams.get("q");
      const limit = url.searchParams.get("limit") ?? "3";

      if (!q) {
        return new Response(JSON.stringify({ error: "Missing ?q=" }), {
          status: 400,
          headers: { "content-type": "application/json" },
        });
      }

      const upstream = new URL("https://api.openweathermap.org/geo/1.0/direct");
      upstream.searchParams.set("q", q);
      upstream.searchParams.set("limit", limit);
      upstream.searchParams.set("appid", env.OPENWEATHER_API_KEY);

      const res = await fetch(upstream.toString());
      return new Response(res.body, {
        status: res.status,
        headers: {
          "content-type": res.headers.get("content-type") ?? "application/json",
        },
      });
    }

    // static assets + SPA fallback
    const assetRes = await env.ASSETS.fetch(request);
    if (assetRes.status !== 404) return assetRes;
    if (looksLikeFile(url.pathname)) return assetRes;

    const indexUrl = new URL(request.url);
    indexUrl.pathname = "/index.html";
    return env.ASSETS.fetch(new Request(indexUrl.toString(), request));
  },
};
