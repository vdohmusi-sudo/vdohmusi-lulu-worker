
  
      export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return new Response(
        JSON.stringify({
          status: "online",
          service: "V. Dohmusi Lulu Fulfillment",
          version: "diagnostic-2"
        }),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    if (url.pathname === "/diagnostic") {
      const keyExists =
        typeof env.LULU_CLIENT_KEY === "string" &&
        env.LULU_CLIENT_KEY.length > 0;

      const secretExists =
        typeof env.LULU_CLIENT_SECRET === "string" &&
        env.LULU_CLIENT_SECRET.length > 0;

      return new Response(
        JSON.stringify({
          worker: "online",
          LULU_CLIENT_KEY_exists: keyExists,
          LULU_CLIENT_SECRET_exists: secretExists
        }),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    return new Response("Not found", {
      status: 404
    });
  }
};
