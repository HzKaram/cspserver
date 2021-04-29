console.log("hello world :o");

// Deprecation
window.webkitStorageInfo;

// Permissions policy violation
navigator.mediaDevices.getUserMedia({ audio: true }).catch(e => {});

// Document policy violation
try {
  document.write("<h1>Hey!</h1>");
} catch (e) {
  console.log(e);
}

// const hashUrlThisV1 = crypto
//   .createHash("sha256")
//   .update("https://new-reporting-api-demo.glitch.me/v1")
//   .digest("hex");
// const hashUrlThisV0 = crypto
//   .createHash("sha256")
//   .update("https://new-reporting-api-demo.glitch.me/v0")
//   .digest("hex");

// const hashUrlIntervention = crypto
//   .createHash("sha256")
//   .update("https://intervention-generator.glitch.me/")
//   .digest("hex");


// const REPORTS_THIS_V1 = `${REPORTING_ENDPOINT_BASE}?appid=${hashUrlThisV1}`;
// const REPORTS_THIS_V0 = `${REPORTING_ENDPOINT_BASE}?appid=${hashUrlThisV0}`;
// const REPORTS_OTHER_APP = `${REPORTING_ENDPOINT_BASE}?appid=${hashUrlIntervention}`;
// const crypto = require("crypto");



