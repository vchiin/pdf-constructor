import {
  BlockTypeDefinitions,
  BlockType,
} from "../constants/types-definition.constant";
import { BlockId } from "./utils.types";

type BlockBaseStyles = {
  marginLeft: number;
  marginRight: number;
  marginTop: number;
  marginBottom: number;
  width: number; // in percents to parent
};

type GenericBlock<Type extends BlockType> = {
  id: BlockId;
  type: Type;
  parentId: BlockId | null;
} & BlockBaseStyles;

export type ContainerBlock<Type extends BlockType> = GenericBlock<Type> & {
  children: BlockId[];
};

export type TextBlock = GenericBlock<typeof BlockTypeDefinitions.Text> & {
  content: string;

  color: string;
  italic: boolean;
  bold: boolean;
  underline: boolean;
  fontSize: number;
  fontFamily: string;
};

export type LineBlock = GenericBlock<typeof BlockTypeDefinitions.Line> & {
  height: number;
  color: string;
};

export type ImageBlock = GenericBlock<typeof BlockTypeDefinitions.Image> & {
  content: string | null;
  ratio: number;
};

export type ColumnBlock = ContainerBlock<typeof BlockTypeDefinitions.Column>;

export type ColumnGroupBlock = ContainerBlock<
  typeof BlockTypeDefinitions.ColumnGroup
> & {
  gap: number;
};

export type BreakBlock = GenericBlock<typeof BlockTypeDefinitions.Break>;

export type PageOrientationBlock = ContainerBlock<
  typeof BlockTypeDefinitions.PageOrientation
> & {
  orientation: "portrait" | "landscape";
};

export type TableBlock = ContainerBlock<typeof BlockTypeDefinitions.Table> & {
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  paddingBottom: number;
};

export type TableRowBlock = ContainerBlock<
  typeof BlockTypeDefinitions.TableRow
>;

export type TableCellBlock = ContainerBlock<
  typeof BlockTypeDefinitions.TableCell
>;

export type HeaderBlock = ContainerBlock<typeof BlockTypeDefinitions.Header>;

export type FooterBlock = ContainerBlock<typeof BlockTypeDefinitions.Footer>;

export type RootBlock = ContainerBlock<typeof BlockTypeDefinitions.Root> & {
  parentId: null;
};

export type Block =
  | TextBlock
  | LineBlock
  | ImageBlock
  | ColumnBlock
  | ColumnGroupBlock
  | RootBlock
  | BreakBlock
  | PageOrientationBlock
  | TableBlock
  | TableRowBlock
  | TableCellBlock
  | HeaderBlock
  | FooterBlock;

export type BlockMap = Record<BlockId, Block>;
