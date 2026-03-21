const fetch = require('node-fetch');

setInterval(() => {
  fetch("http://192.168.0.126:11434/api/generate", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      model: "llama3.2:3b",
      prompt: "ping",
      num_predict: 1,
      stream: false
    })
  }).catch(()=>{});
}, 5000); 