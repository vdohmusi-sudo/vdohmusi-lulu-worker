
  
    
       export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return json({
        status: "online",
        service: "V. Dohmusi Lulu Fulfillment",
        version: "lulu-auth-test"
      });
    }

    if (url.pathname === "/diagnostic") {
      return json({
        worker: "online",
        LULU_CLIENT_KEY_exists:
          typeof env.LULU_CLIENT_KEY === "string" &&
          env.LULU_CLIENT_KEY.length > 0,
        LULU_CLIENT_SECRET_exists:
          typeof env.LULU_CLIENT_SECRET === "string" &&
          env.LULU_CLIENT_SECRET.length > 0
      });
    }

    if (url.pathname === "/test-lulu") {
      try {
        if (!env.LULU_CLIENT_KEY || !env.LULU_CLIENT_SECRET) {
          return json({
            success: false,
            error: "Lulu credentials are missing"
          }, 500);
        }

        const credentials = btoa(
          `${env.LULU_CLIENT_KEY}:${env.LULU_CLIENT_SECRET}`
        );

        const response = await fetch(
          "https://api.sandbox.lulu.com/auth/realms/glasstree/protocol/openid-connect/token",
          {
            method: "POST",
            headers: {
              "Authorization": `Basic ${credentials}`,
              "Content-Type": "application/x-www-form-urlencoded",
              "Accept": "application/json"
            },
            body: "grant_type=client_credentials"
          }
        );

        const text = await response.text();

        let data;

        try {
          data = JSON.parse(text);
        } catch {
          data = {
            raw_response: text.substring(0, 300)
          };
        }

        return json({
          success: response.ok,
          lulu_status: response.status,
          token_received: response.ok && !!data.access_token,
          error: response.ok ? null : data
        });

      } catch (error) {
        return json({
          success: false,
          error: error.message
        }, 500);
      }
    }

    return new Response("Not found", { status: 404 });
  }
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
