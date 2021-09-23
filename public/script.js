console.log("hello world :o");

// COOP
const popup = window.open(
  "https://coop-report-generator.glitch.me/",
  "popup",
  "width=420, height=420"
);
// TODO: why doesn't this generate a report of type "access-to-coop-page-from-opener""
// console.log(popup);
// popup.postMessage("test", "*");

// Deprecation
window.webkitStorageInfo;

// Document policy violation
try {
  document.write("<h1>Hey!</h1>");
} catch (e) {
  console.log(e);
}

// Experimental: permissions policy violation
navigator.mediaDevices.getUserMedia({ audio: true }).catch(e => {});
