
  }
};
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return new Response(
        JSON.stringify({
          status: "online",
          service: "V. Dohmusi Lulu Fulfillment"
        }),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    if (url.pathname === "/diagnostic") {
      return new Response(
        JSON.stringify({
          worker: "online",

          LULU_CLIENT_KEY_exists:
            typeof env.LULU_CLIENT_KEY === "string" &&
            env.LULU_CLIENT_KEY.length > 0,

          LULU_CLIENT_SECRET_exists:
            typeof env.LULU_CLIENT_SECRET === "string" &&
            env.LULU_CLIENT_SECRET.length > 0,

          LULU_BASIC_AUTH_exists:
            typeof env.LULU_BASIC_AUTH === "string" &&
            env.LULU_BASIC_AUTH.length > 0
        }),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    return new Response("Not found", { status: 404 });
  }
};
