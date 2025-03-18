// Options Page Script
document.addEventListener('DOMContentLoaded', () => {
    const fontSize = document.getElementById('fontSize');
    const lineHeight = document.getElementById('lineHeight');
    const wordSpacing = document.getElementById('wordSpacing');
    const colorScheme = document.getElementById('colorScheme');
  
    // Display current values
    fontSize.addEventListener('input', () => {
      document.getElementById('fontSizeValue').textContent = fontSize.value;
    });
  
    lineHeight.addEventListener('input', () => {
      document.getElementById('lineHeightValue').textContent = lineHeight.value;
    });
  
    wordSpacing.addEventListener('input', () => {
      document.getElementById('wordSpacingValue').textContent = wordSpacing.value;
    });
  
    // Load saved preferences
    chrome.storage.sync.get(['adhd_reader_prefs'], (result) => {
      if (result.adhd_reader_prefs) {
        const prefs = result.adhd_reader_prefs;
        fontSize.value = prefs.fontSize;
        lineHeight.value = prefs.lineHeight;
        wordSpacing.value = prefs.wordSpacing;
        colorScheme.value = prefs.colorScheme;
  
        // Update displayed values
        document.getElementById('fontSizeValue').textContent = prefs.fontSize;
        document.getElementById('lineHeightValue').textContent = prefs.lineHeight;
        document.getElementById('wordSpacingValue').textContent = prefs.wordSpacing;
      }
    });
  
    // Save preferences
    [fontSize, lineHeight, wordSpacing, colorScheme].forEach(input => {
      input.addEventListener('change', () => {
        const preferences = {
          fontSize: parseInt(fontSize.value),
          lineHeight: parseFloat(lineHeight.value),
          wordSpacing: parseFloat(wordSpacing.value),
          colorScheme: colorScheme.value
        };
  
        chrome.storage.sync.set({ 'adhd_reader_prefs': preferences }, () => {
          console.log('ADHD Reader preferences saved');
        });
      });
    });
  });