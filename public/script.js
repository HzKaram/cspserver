console.log("hello world :o");

// Permissions policy violation
navigator.mediaDevices.getUserMedia({ audio: true }).catch(e => {});

// Document policy violation
document.write("<h1>Hey!</h1>");

// Deprecation 
window.webkitStorageInfo;