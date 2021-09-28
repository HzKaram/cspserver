console.log("hello world :o");

// COOP
const popup = window.open(
  // TODO pass this as a variable
  "https://coop-report-generator.glitch.me/",
  "popup",
  "width=420, height=420"
);
// TODO: why doesn't this ⤵️ generate a report of type "access-to-coop-page-from-opener"
console.log(popup);
// ! too early on n'a pas fait la navigation

setTimeout(() => {
  popup.postMessage("test", "*");
}, 3000)

// Deprecation
window.webkitStorageInfo;

// Document policy violation
try {
  document.write("<h1>Hey!</h1>");
} catch (e) {
  console.log(e);
}

// Browser intervention
window.navigator.vibrate(1);

// Experimental: permissions policy violation
navigator.mediaDevices.getUserMedia({ audio: true }).catch(e => {});
