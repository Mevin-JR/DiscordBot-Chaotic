const fetch = require('node-fetch');

// 🧠 Keep model warm without killing your system
setInterval(() => {
  fetch("http://192.168.0.126:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "phi",
      prompt: "ping",
      num_predict: 5,
      stream: false
    })
  }).catch(() => {});
}, 120000);
