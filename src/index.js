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

    let html = await resp.text();

    // Inject custom colors here
    html = html.replace(
      "</head>",
      `<style>
        body {
          background-color: #0f172a !important;
          color: white !important;
        }

        .navbar, header {
          background-color: #020617 !important;
        }

        button {
          background-color: #2563eb !important;
          color: white !important;
          border: none !important;
        }

        a {
          color: #38bdf8 !important;
        }
      </style></head>`
    );

    return new Response(html, resp);
  }
};
