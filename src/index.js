import { R2Explorer } from "r2-explorer";

const explorer = R2Explorer({
  readonly: false,
  basicAuth: [
    { username: "phadmin", password: "phadmin" }
  ]
});

export default {
  async fetch(request, env, ctx) {

    const resp = await explorer.fetch(request, env, ctx);

    const contentType = resp.headers.get("content-type") || "";

    // ✅ Only modify HTML
    if (contentType.includes("text/html")) {

      // Clone response BEFORE reading
      const cloned = resp.clone();

      let html = await cloned.text();

      html = html.replace(
        "</head>",
        `<style>
          body {
            background-color: black !important;
            color: white !important;
          }
        </style></head>`
      );

      return new Response(html, {
        status: resp.status,
        headers: resp.headers
      });
    }

    // ✅ Return everything else untouched
    return resp;
  }
};
