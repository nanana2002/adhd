class ADHDReader {
  constructor() {
    // Content selectors in order of preference
    this.CONTENT_SELECTORS = [
      'article',
      'main',
      '.content',
      '.article-body',
      '#main-content',
      'body'
    ];

    // Sentence delimiters for different languages
    this.SENTENCE_DELIMITERS = {
      'zh': ['。', '！', '？'],
      'en': ['.', '!', '?', '。', '！', '？']
    };

    // Default reading preferences
    this.preferences = {
      fontSize: 16,
      lineHeight: 1.5,
      wordSpacing: 0.1,
      colorScheme: 'pastel'
    };

    this.initializePreferences();
    this.applyTypographySettings();
    this.processContent();
  }

  // Load user preferences from storage
  initializePreferences() {
    chrome.storage.sync.get(['adhd_reader_prefs'], (result) => {
      if (result.adhd_reader_prefs) {
        this.preferences = result.adhd_reader_prefs;
        this.applyTypographySettings();
      }
    });
  }

  // Apply typography settings
  applyTypographySettings() {
    document.body.style.setProperty('--adhd-font-size', `${this.preferences.fontSize}px`);
    document.body.style.setProperty('--adhd-line-height', this.preferences.lineHeight);
    document.body.style.setProperty('--adhd-word-spacing', `${this.preferences.wordSpacing}em`);
  }

  // Process content
  processContent() {
    const article = document.querySelector(this.CONTENT_SELECTORS.join(', '));

    if (article) {
      const text = article.textContent;
      const sentences = text.split(new RegExp(this.SENTENCE_DELIMITERS['zh'].join('|'))).filter(Boolean);
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
    } else {
      console.error("No article element found on this page.");
    }
  }
}

new ADHDReader();