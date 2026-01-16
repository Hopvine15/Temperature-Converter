export interface Env {
  OPENWEATHER_API_KEY: string;
  ASSETS: any; // Binding for static assets
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // secure API proxy (key stays server-side)
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
        headers: {
          "content-type": res.headers.get("content-type") ?? "application/json",
        },
      });
    }

    // serve dist static assests
    const assetRes = await env.ASSETS.fetch(request);

    // fallback: if it's not a real file return index.html
    if (assetRes.status === 404) {
      const indexUrl = new URL(request.url);
      indexUrl.pathname = "/index.html";
      return env.ASSETS.fetch(new Request(indexUrl.toString(), request));
    }

    return assetRes;
  },
};