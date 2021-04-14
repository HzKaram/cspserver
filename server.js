const express = require("express");
const app = express();

const REPORTING_ENDPOINT = "https://reports-endpoint.glitch.me/reports";

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.set(
    "Content-Security-Policy",
    `script-src 'self'; object-src 'none'; report-to main-endpoint;`
  );

  response.set("Permissions-Policy", `microphone=()`);
  
  response.set("Document-Policy", `document-write=?0;report-to=main-endpoint`);
  
  response.set("Cross-Origin-Embedder-Policy", `require-corp;report-to="main-endpoint"`);
  
  response.set("Reporting-Endpoints", `main-endpoint="${REPORTING_ENDPOINT}", default="${REPORTING_ENDPOINT}"`);

  response.sendFile(__dirname + "/views/index.html");
});


const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
