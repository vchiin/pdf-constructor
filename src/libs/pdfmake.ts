import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "pdfmake/interfaces";

pdfMake.vfs = pdfFonts.vfs;

export const PAGE_WIDTH_PT = 595.35;
export const PAGE_HEIGHT_PT = 841.995;
export const HORIZONTAL_MARGIN_PT = 40;
export const ACTUAL_PAGE_WIDTH_PT = PAGE_WIDTH_PT - HORIZONTAL_MARGIN_PT * 2;

export const createPDF = (document: TDocumentDefinitions) => {
  pdfMake.createPdf(document).open();
};
