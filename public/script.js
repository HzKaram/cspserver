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
