let url = "https://translation.googleapis.com/v3/projects/flash-cards-app-hw:translateText";
let response = fetch(url, {
  method: "POST",
  headers: {
    "Authorization": "Bearer ya29.a0Ael9sCNDw6w1QbC8uB9Xfm-Encd1iTS0UinfDBYQecrOqNsaWKXdMhZe1yBALE5PQ7g5OR0jiU9_ShqM63KVhGMT4r2wgzmFVREYv44UnoXXsJnPyvpELzfLBwj-jNVzvi6sjGG1qYS05jVy5F0s9ATJjOCgRm_Xps0laCgYKAcoSARISFQF4udJhN2t5RccftDKq4UYPu7S23A0171",  // Modified
    "Content-Type": "application/json",
    "X-Goog-User-Project": "flash-cards-app-hw"
},
  body: JSON.stringify({
    sourceLanguageCode: "en",
    targetLanguageCode: "pt",
    contents: ["come"],
    mimeType: "text/plain",
  }),
}).then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });