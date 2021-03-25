const express = require("express");
const app = express();

const REPORTING_ENDPOINT = "https://csp-reports.glitch.me/reports"


app.use(express.static("public"));

app.get("/", (request, response) => {
  
    response.set(
    "Content-Security-Policy",
    `script-src 'none'; object-src 'none'; report-uri ${REPORTING_ENDPOINT}; erport-to csp-endpoint`
  );
  
    response.set(
    // "Report-To": {
    //   group: "csp",
    //   max_age: 10886400,
    //   endpoints: [{ url: "https://csp-reports.glitch.me/post" }]
    // },
    "Content-Security-Policy-Report-Only",
    `script-src 'none'; object-src 'none'; report-uri ${REPORTING_ENDPOINT}; report-to csp`
  );
  
  response.set("Reporting-Endpoints", `csp-endpoint="${REPORTING_ENDPOINT}"`);
  
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
