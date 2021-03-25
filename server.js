const express = require("express");
const app = express();

const REPORTING_ENDPOINT = "https://csp-reports.glitch.me/reports"


app.use(express.static("public"));

app.get("/", (request, response) => {
  
  // Very old style: report-uri only
  
  // Old style
    response.set(
    "Content-Security-Policy",
    `script-src 'none'; object-src 'none'; report-uri ${REPORTING_ENDPOINT}; report-to csp-endpoint`
  );
  // End old style (report-to can be used even in the old style, when paired with the "Report-To" header)
  
  // New style
  // response.set(
  //   "Content-Security-Policy",
  //   `script-src 'none'; object-src 'none'; report-uri ${REPORTING_ENDPOINT}; report-to csp-endpoint`
  // );
  
  // response.set("Reporting-Endpoints", `csp-endpoint="${REPORTING_ENDPOINT}"`);
  
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
