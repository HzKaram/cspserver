// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

const REPORTING_ENDPOINT = "https://csp-reports.glitch.me/reports"


// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// Reporting-Endpoints: endpoint-1="https://reports.example", endpoint-2="https://reports.example"

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
    response.set("Reporting-Endpoints", `csp-endpoint="${REPORTING_ENDPOINT}"`);
    // "Reporting-Endpoints: {
    //   group: "csp",
    //   max_age: 10886400,
    //   endpoints: [{ url: "https://csp-reports.glitch.me/post" }]
    // },
    // "Content-Security-Policy-Report-Only",
    // `script-src 'none'; object-src 'none'; report-uri ${REPORTING_ENDPOINT}; report-to csp`
  // );
  
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
