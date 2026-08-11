export default {
  async fetch(request, env) {
    return new Response(
      JSON.stringify({
        status: "online",
        service: "V. Dohmusi Lulu Fulfillment",
        test: "fresh worker"
      }),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
};
