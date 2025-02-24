export const BlockTypeDefinitions = {
  Root: "root",
  Text: "text",
  Line: "line",
  Image: "image",
  Column: "column",
  ColumnGroup: "column-group",
  Break: "break",
  PageOrientation: "page-orientation",
  Table: "table",
  TableRow: "table-row",
  TableCell: "table-cell",
} as const;

export type BlockType =
  (typeof BlockTypeDefinitions)[keyof typeof BlockTypeDefinitions];

export const CustomBlockTypeDefinitions = {
  Template: "template",
} as const;

export type GeneralBlockType =
  | BlockType
  | (typeof CustomBlockTypeDefinitions)[keyof typeof CustomBlockTypeDefinitions];
