import { R2Explorer } from 'r2-explorer';

const explorer = R2Explorer({ 
  readonly: false,
  basicAuth: [{
    username: 'phadmin',
    password: 'phadmin'
  }]
});

export default {
  async fetch(request, env, ctx) {

    const resp = await explorer.fetch(request, env, ctx);

    const contentType = resp.headers.get("content-type") || "";

    // ✅ Only touch HTML responses
    if (contentType.includes("text/html")) {

      let html = await resp.text();

      html = html.replace(
        "</head>",
        `<style>
          body { background-color: black !important; color: white !important; }
        </style></head>`
      );

      return new Response(html, {
        status: resp.status,
        headers: resp.headers
      });
    }

    // ✅ For files / JSON / streams → return untouched
    return resp;
  }
};
