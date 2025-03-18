// Ensure PDF.js library is loaded
if (typeof pdfjsLib === 'undefined') {
    console.error('PDF.js library is not loaded.');
  } else {
    pdfjsLib.GlobalWorkerOptions.workerSrc = chrome.runtime.getURL('scripts/pdfjs/pdf.worker.js');
  
    async function pdfToHtml(file) {
      const loadingTask = pdfjsLib.getDocument(file);
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      let htmlContent = '';
  
      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        textContent.items.forEach(item => {
          htmlContent += `<p>${item.str}</p>`;
        });
      }
  
      return htmlContent;
    }
  
    // Example usage
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'application/pdf';
    fileInput.addEventListener('change', async (event) => {
      const file = event.target.files[0];
      const htmlContent = await pdfToHtml(file);
      document.body.innerHTML = htmlContent;
    });
  
    document.body.appendChild(fileInput);
  }