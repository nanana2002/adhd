const article = document.querySelector("article");

if (article) {
  const text = article.textContent;
  const sentences = text.split('。').filter(Boolean); // Split text into sentences by '。'
  article.innerHTML = ''; // Clear the article content

  sentences.forEach((sentence, index) => {
    const p = document.createElement('p');
    p.textContent = sentence + '。';
    p.style.backgroundColor = index % 2 === 0 ? '#f0f0f0' : '#ffffff'; // Alternate background color
    article.appendChild(p);
  });

  const words = article.querySelectorAll('p');
  words.forEach(p => {
    p.innerHTML = p.textContent.split(' ').map(word => `<b>${word}</b>`).join(' ');
  });

  // Calculate reading time
  const wordMatchRegExp = /[^\s]+/g; // Regular expression
  const wordCount = text.match(wordMatchRegExp).length;
  const readingTime = Math.round(wordCount / 200);
  const badge = document.createElement("p");
  badge.classList.add("color-secondary-text", "type--caption");
  badge.textContent = `⏱️ ${readingTime} min read`;

  // Support for API reference docs
  const heading = article.querySelector("h1");
  // Support for article docs with date
  const date = article.querySelector("time")?.parentNode;

  if (date || heading) {
    (date ?? heading).insertAdjacentElement("afterend", badge);
  } else {
    console.error("No suitable element found to insert the badge.");
  }
}