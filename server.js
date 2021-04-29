const express = require("express");
const app = express();

const REPORTING_ENDPOINT_BASE = "https://reports-endpoint.glitch.me";
const REPORTS_POST_URL = `${REPORTING_ENDPOINT_BASE}/reports`;
const REPORTS_DISPLAY_URL = REPORTING_ENDPOINT_BASE;
const INTERVENTION_GENERATOR_URL = "https://intervention-generator.glitch.me/";
const CODE = "https://glitch.com/edit/#!/new-reporting-api-demo";
const AUTHOR = "https://twitter.com/maudnals";

app.use(express.static("public"));
app.set("view engine", "pug");

app.get("/", (request, response) => {
  response.redirect("/v1");
});

app.get("/v1", (request, response) => {
  
  // Set the policy and rules that will generate reports when violated
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

  // Set the endpoints (API V0)
  response.set(
    "Reporting-Endpoints",
    `main-endpoint="${REPORTS_POST_URL}", default="${REPORTS_POST_URL}"`
  );

  // Send the response
  response.render("index", {
    version: "v1",
    otherVersion: "v0",
    reportsDisplayUrl: REPORTS_DISPLAY_URL,
    interventionGeneratorUrl: INTERVENTION_GENERATOR_URL
  });
});

app.get("/v0", (request, response) => {
  
  // Set the policy and rules that will generate reports when violated
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

  // Set the endpoints (API V0)
  const mainEndpoint = JSON.stringify({
    group: "main-endpoint",
    max_age: 10886400,
    endpoints: [{ url: `${REPORTS_POST_URL}` }]
  });
  const defaultEndpoint = JSON.stringify({
    max_age: 10886400,
    endpoints: [{ url: `${REPORTS_POST_URL}` }]
  });
  response.set("Report-To", `${mainEndpoint}, ${defaultEndpoint}`);

  // Send the response
  response.render("index", {
    version: "v0",
    otherVersion: "v1",
    reportsDisplayUrl: REPORTS_DISPLAY_URL,
    interventionGeneratorUrl: INTERVENTION_GENERATOR_URL
  });
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
