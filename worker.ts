export interface Env {
  OPENWEATHER_API_KEY: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

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

    return new Response("Not found", { status: 404 });
  },
};
