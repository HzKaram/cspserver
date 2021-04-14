const express = require("express");
const app = express();

const REPORTING_ENDPOINT = "https://reports-endpoint.glitch.me/reports";

app.use(express.static("public"));

app.get("/", (request, response) => {
  // 1. SET A CSP
  // Very old style: report-uri only
  //   response.set(
  //   "Content-Security-Policy",
  //   `script-src 'none'; object-src 'none'; report-uri ${REPORTING_ENDPOINT};`
  // );

  // Old style: also with report-to on top of report-uri. report-to can be used even in the old style, when paired with the "Report-To" header.

  // New style: report-to only (not recommended with old reporting API, because of xbrowser support)
  response.set(
    "Content-Security-Policy",
    `script-src 'self'; object-src 'none'; report-to main-endpoint;`
  );

  // this syntax means no microphone allowed
  response.set("Permissions-Policy", `microphone=()`);
  
  response.set("Document-Policy", `document-write=?0;report-to=main-endpoint`);
  
  response.set("Cross-Origin-Embedder-Policy", `require-corp;report-to=main-endpoint`);
  response.set("Cross-Origin-Opener-Policy", `same-origin;report-to=main-endpoint`);
  

  // SET ENDPOINTS
  response.set("Reporting-Endpoints", `main-endpoint="${REPORTING_ENDPOINT}", default="${REPORTING_ENDPOINT}"`);

  
  response.sendFile(__dirname + "/views/index.html");
});

// // send the default array of dreams to the webpage
// app.get("/dreams", (request, response) => {
//   // express helps us take JS objects and send them as JSON
//   response.json(dreams);
// });

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
