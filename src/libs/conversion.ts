import {
  Block,
  BlockMap,
} from "@/components/pdf-constructor/contexts/constructor/constructor.types";
import {
  findBlock,
  findChildrenBlocks,
  isContainerBlock,
} from "@/components/pdf-constructor/contexts/constructor/pdf-constructor-context.utils";
import { BlockTypeDefinitions } from "@/components/pdf-constructor/shared/constants/types-definition.constant";

import { BlockId } from "@/components/pdf-constructor/shared/types/utils.types";
import {
  Column,
  Content,
  ContentColumns,
  ContentStack,
  ContentTable,
  Margins,
  TableCell,
  TDocumentDefinitions,
} from "pdfmake/interfaces";
import { ACTUAL_PAGE_WIDTH_PT } from "./pdfmake";
import { convertPxToPt } from "@/shared/utils/units.utils";

export const parseBlock = (
  block: Block,
  map: BlockMap,
  parentWidth: number
): Content => {
  switch (block.type) {
    case BlockTypeDefinitions.Text: {
      return {
        text: block.content,
        color: block.color,
        bold: block.bold,
        italics: block.italic,
        decoration: block.underline ? "underline" : undefined,
        fontSize: convertPxToPt(block.fontSize),
        font: block.fontFamily,
      };
    }
    case BlockTypeDefinitions.Image: {
      if (block.content === null) {
        return { text: "" };
      }

      const width = parentWidth * (block.width / 100);

      return {
        image: block.content,
        width: width,
      };
    }
    case BlockTypeDefinitions.Line: {
      const width = parentWidth * (block.width / 100);

      return {
        canvas: [
          {
            type: "line",
            x1: 0,
            y1: 0,
            x2: width,
            y2: 0,
            lineWidth: convertPxToPt(block.height),
            lineColor: block.color,
          },
        ],
      };
    }
    case BlockTypeDefinitions.ColumnGroup: {
      const children = findChildrenBlocks(block.id, map);

      return {
        columns: children.map((child) =>
          parseBlock(child, map, parentWidth - convertPxToPt(block.gap))
        ),
        columnGap: convertPxToPt(block.gap),
      } as ContentColumns;
    }
    case BlockTypeDefinitions.Column: {
      const width = parentWidth * (block.width / 100);
      const children = findChildrenBlocks(block.id, map);

      return {
        width: width,
        stack: children.map((child) => parseBlock(child, map, width)),
      } as Column;
    }
    case BlockTypeDefinitions.Break: {
      return {
        stack: [],
        pageBreak: "before",
        pageOrientation: block.pageOrientation,
      } as ContentStack;
    }
    case BlockTypeDefinitions.TableCell: {
      const children = findChildrenBlocks(block.id, map);

      return {
        stack: children.map((child) => parseBlock(child, map, parentWidth)),
        // default margins: [5, 5, 5, 5] which can not be overridden to 0
      } satisfies TableCell;
    }
    case BlockTypeDefinitions.Table: {
      const rows = findChildrenBlocks(block.id, map);
      const cells = rows.length > 0 ? findChildrenBlocks(rows[0].id, map) : [];

      const paddingLeft = convertPxToPt(block.paddingLeft);
      const paddingRight = convertPxToPt(block.paddingRight);
      const paddingTop = convertPxToPt(block.paddingTop);
      const paddingBottom = convertPxToPt(block.paddingBottom);

      const widths = cells.map(
        (cell) => parentWidth * (cell.width / 100) - paddingLeft - paddingRight
      );

      return {
        table: {
          widths,
          body: rows.map((child) => {
            const children = findChildrenBlocks(child.id, map);
            return children.map((child, index) =>
              parseBlock(child, map, widths[index])
            );
          }),
        },
        layout: {
          paddingLeft: () => paddingLeft,
          paddingRight: () => paddingRight,
          paddingTop: () => paddingTop,
          paddingBottom: () => paddingBottom,
        },
      } as ContentTable;
    }
    default:
      return { text: "Unknown component" };
  }
};

export const parseConfigToPdf = (rootId: BlockId, map: BlockMap) => {
  const root = findBlock(rootId, map);

  if (!root || !isContainerBlock(root)) {
    throw new Error("Root block not found");
  }

  const pageMargins = [
    convertPxToPt(root.marginLeft),
    convertPxToPt(root.marginRight),
    convertPxToPt(root.marginTop),
    convertPxToPt(root.marginBottom),
  ] satisfies Margins;

  return {
    content: root.children.map((childId) => {
      const child = findBlock(childId, map);
      return parseBlock(child, map, ACTUAL_PAGE_WIDTH_PT);
    }),
    pageMargins,
  } as const satisfies TDocumentDefinitions;
};

export const prepareDocument = (
  rootId: BlockId,
  map: BlockMap
  // previewWidth: number
): TDocumentDefinitions => {
  const document = parseConfigToPdf(rootId, map);

  return {
    ...document,
    defaultStyle: {
      font: "Roboto",
    },
  };
};
