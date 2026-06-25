import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const extractPdfText = async (buffer) => {
  const uint8Array = new Uint8Array(buffer);

  const pdf =
    await pdfjsLib.getDocument({
      data: uint8Array,
    }).promise;

  let text = "";

  for (
    let pageNum = 1;
    pageNum <= pdf.numPages;
    pageNum++
  ) {
    const page =
      await pdf.getPage(pageNum);

    const content =
      await page.getTextContent();

    const pageText =
      content.items
        .map(
          (item) => item.str
        )
        .join(" ");

    text += pageText + "\n";
  }

  return text;
};

export default extractPdfText;