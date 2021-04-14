console.log("hello world :o");

// Deprecation warning
window.webkitStorageInfo;

// Permissions policy violation
navigator.mediaDevices.getUserMedia({ audio: true }).catch(e => {});

// Document policy violation
document.write("<h1>Hey!</h1>");

// document.addEventListener('wheel', event => {
//   event.preventDefault();
// });

var el = document.getElementById("body");
el.addEventListener("touchstart", () => {console.log("touched")}, false);

performance.measureUserAgentSpecificMemory().catch(e => {});
