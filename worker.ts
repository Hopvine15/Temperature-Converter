export interface Env {
  OPENWEATHER_API_KEY: string;
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

function looksLikeFile(pathname: string) {
  // If it ends with ".js", ".css", ".svg", etc, it's a file request.
  return /\.[a-zA-Z0-9]+$/.test(pathname);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // secure API proxy endpoint
    if (url.pathname === "/api/weather") {
      const city = url.searchParams.get("city");
      if (!city) {
        return new Response(JSON.stringify({ error: "Missing ?city=" }), {
          status: 400,
          headers: { "content-type": "application/json" },
        });
      }

      const upstream = new URL("https://api.openweathermap.org/data/2.5/weather");
      upstream.searchParams.set("q", city);
      upstream.searchParams.set("appid", env.OPENWEATHER_API_KEY);
      upstream.searchParams.set("units", "metric");

      const res = await fetch(upstream.toString());
      return new Response(res.body, {
        status: res.status,
        headers: { "content-type": res.headers.get("content-type") ?? "application/json" },
      });
    }

    // ---- Static assets ----
    const assetRes = await env.ASSETS.fetch(request);

    // If the asset exists, return it (JS/CSS will have correct MIME type)
    if (assetRes.status !== 404) {
      return assetRes;
    }

    // f it's a file request and it's missing, DO NOT return index.html
    // Return the 404 so the browser doesn't get HTML for a JS module
    if (looksLikeFile(url.pathname)) {
      return assetRes;
    }

    const indexUrl = new URL(request.url);
    indexUrl.pathname = "/index.html";
    return env.ASSETS.fetch(new Request(indexUrl.toString(), request));
  },
};
