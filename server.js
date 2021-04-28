const express = require("express");
const app = express();

const REPORTING_ENDPOINT_BASE = "https://reports-endpoint.glitch.me";
const REPORTING_ENDPOINT = `${REPORTING_ENDPOINT_BASE}/reports`;
const REPORTS_THIS = `${REPORTING_ENDPOINT_BASE}/86b9d42c70c79b0ff43435a2f7a94d9c910e07cf0e96e4051b8303c0efbb1ff6`;
// const REPORTS_INTERVENTION

const CODE = "https://glitch.com/edit/#!/new-reporting-api-demo";
const AUTHOR = "https://twitter.com/maudnals";

app.use(express.static("public"));
app.set("view engine", "pug");

app.get("/v1", (request, response) => {
  response.set(
    "Content-Security-Policy",
    `script-src 'self'; object-src 'none'; report-to main-endpoint;`
  );

  response.set("Permissions-Policy", `microphone=()`);

  response.set("Document-Policy", `document-write=?0;report-to=main-endpoint`);

  response.set(
    "Cross-Origin-Embedder-Policy",
    `require-corp;report-to="main-endpoint"`
  );

  response.set(
    "Reporting-Endpoints",
    `main-endpoint="${REPORTING_ENDPOINT}", default="${REPORTING_ENDPOINT}"`
  );

  response.render("index", {
    version: "v1",
    otherVersion: "v0",
    endpoint: `${REPORTING_ENDPOINT}`,
    interventionGeneratorUrl: "https://intervention-generator.glitch.me/"
  });
});

app.get("/v0", (request, response) => {
  response.set(
    "Content-Security-Policy",
    `script-src 'self'; object-src 'none'; report-to main-endpoint;`
  );

  response.set("Permissions-Policy", `microphone=()`);

  response.set("Document-Policy", `document-write=?0;report-to=main-endpoint`);

  response.set(
    "Cross-Origin-Embedder-Policy",
    `require-corp;report-to="main-endpoint"`
  );

  const x = JSON.stringify({
    group: "main-endpoint",
    max_age: 10886400,
    endpoints: [{ url: `${REPORTING_ENDPOINT}` }]
  });

  const y = JSON.stringify({
    max_age: 10886400,
    endpoints: [{ url: `${REPORTING_ENDPOINT}` }]
  });

  response.set("Report-To", `${x}, ${y}`);

  response.render("index", {
    version: "v0",
    otherVersion: "v1",
    reportsDisplayUrl: `${REPORTS_THIS}`,
    interventionGeneratorUrl: "https://intervention-generator.glitch.me/"
  });
});

// const listener = app.listen(process.env.PORT, () => {
//   console.log("Your app is listening on port " + listener.address().port);
// });
