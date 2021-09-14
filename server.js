const express = require("express");
const app = express();

const REPORTING_ENDPOINT_BASE = "https://reports-endpoint.glitch.me";
const REPORTING_ENDPOINT_MAIN = `${REPORTING_ENDPOINT_BASE}/main`;
const REPORTING_ENDPOINT_DEFAULT = `${REPORTING_ENDPOINT_BASE}/default`;
const REPORTS_DISPLAY_URL = REPORTING_ENDPOINT_BASE;
const INTERVENTION_GENERATOR_URL = "https://intervention-generator.glitch.me/";
const CODE_URL = "https://glitch.com/edit/#!/reporting-api-demo";
const AUTHOR = "https://twitter.com/maudnals";

app.use(express.static("public"));
app.set("view engine", "pug");

app.get("/", (request, response) => {
  response.redirect("/page");
});

// Middleware that sets 
// * the reporting endpoint for *all* requests
// * the policy and rules that will generate reports when violated
app.use(function(request, response, next) {
  // Set the endpoints (API V1)
  response.set(
    "Reporting-Endpoints",
    `main-endpoint="${REPORTING_ENDPOINT_MAIN}", default="${REPORTING_ENDPOINT_DEFAULT}"`
  );

  // KEEP this ⤵️ with Report-To (v0) IF YOU'RE MIGRATING AND ALREADY HAVE REPORTING FUNCTIONALITY IN YOUR CODE
  // const mainEndpoint = JSON.stringify({
  //   group: "main-endpoint",
  //   max_age: 10886400,
  //   endpoints: [{ url: `${REPORTING_ENDPOINT_MAIN}` }]
  // });
  // const defaultEndpoint = JSON.stringify({
  //   max_age: 10886400,
  //   endpoints: [{ url: `${REPORTING_ENDPOINT_DEFAULT}` }]
  // });
  // response.set("Report-To", `${mainEndpoint}, ${defaultEndpoint}`);

  // Set the rules and policies (these will get violated for the demo)
  response.set(
    "Content-Security-Policy",
    `script-src 'self'; object-src 'none'; report-to main-endpoint;`
  );
  response.set("Document-Policy", `document-write=?0;report-to=main-endpoint`);
  response.set(
    "Cross-Origin-Embedder-Policy",
    `require-corp;report-to="main-endpoint"`
  );
  
  response.set(
    "Cross-Origin-Opener-Policy",
    `"same-origin"`
  );
  
  // experimental
  response.set("Permissions-Policy", `microphone=()`);

  next();
});

app.get("/page", (request, response) => {
  response.render("index", {
    version: "v1",
    reportsDisplayUrl: REPORTS_DISPLAY_URL,
    interventionGeneratorUrl: INTERVENTION_GENERATOR_URL,
    codeUrl: CODE_URL,
    author: AUTHOR
  });
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
