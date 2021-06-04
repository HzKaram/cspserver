console.log("hello world :o");

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



