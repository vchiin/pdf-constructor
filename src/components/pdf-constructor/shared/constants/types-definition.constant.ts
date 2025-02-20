export const BlockTypeDefinitions = {
  Root: "root",
  Text: "text",
  Line: "line",
  Image: "image",
  Column: "column",
  ColumnGroup: "column-group",
  Break: "break",
  Table: "table",
  TableRow: "table-row",
  TableCell: "table-cell",
} as const;

export type BlockType =
  (typeof BlockTypeDefinitions)[keyof typeof BlockTypeDefinitions];
