// Include PDF.js library
import * as pdfjsLib from './pdfjs/pdf';
import './pdfjs/pdf_viewer.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = './pdfjs/pdf.worker.js';

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