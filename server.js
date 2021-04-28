const express = require("express");
const app = express();
const crypto = require("crypto");

const REPORTING_ENDPOINT_BASE = "https://reports-endpoint.glitch.me";
const REPORTING_ENDPOINT = `${REPORTING_ENDPOINT_BASE}/reports`;

const hashUrlThisV1 = crypto
  .createHash("sha256")
  .update("https://new-reporting-api-demo.glitch.me/v1")
  .digest("hex");
const hashUrlThisV0 = crypto
  .createHash("sha256")
  .update("https://new-reporting-api-demo.glitch.me/v0")
  .digest("hex");

const hashUrlIntervention = crypto
  .createHash("sha256")
  .update("https://intervention-generator.glitch.me/")
  .digest("hex");

const REPORTS_THIS_V1 = `${REPORTING_ENDPOINT_BASE}?appid=${hashUrlThisV1}`;
const REPORTS_THIS_V0 = `${REPORTING_ENDPOINT_BASE}?appid=${hashUrlThisV0}`;
const REPORTS_OTHER_APP = `${REPORTING_ENDPOINT_BASE}?appid=${hashUrlIntervention}`;

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
    reportsDisplayUrl: REPORTS_THIS_V1,
    otherReportsDisplayUrl: REPORTS_OTHER_APP,
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
    reportsDisplayUrl: REPORTS_THIS_V0,
    otherReportsDisplayUrl: REPORTS_OTHER_APP,
    interventionGeneratorUrl: "https://intervention-generator.glitch.me/"
  });
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
