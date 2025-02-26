import {
  Block,
  BreakBlock,
  ColumnBlock,
  ColumnGroupBlock,
  ImageBlock,
  LineBlock,
  PageOrientationBlock,
  RootBlock,
  TableBlock,
  TableCellBlock,
  TextBlock,
} from "../shared/types/block.types";
import {
  BlockTypeDefinitions,
  BlockType,
} from "../shared/constants/types-definition.constant";
import { BlockId } from "../shared/types/utils.types";

// export const generateId = () =>
//   Math.random()
//     .toString(36)
//     .replace(/[^a-z]+/g, "")
//     .slice(2, 10);

let i = 0;
export const generateBlockId = () => (i++).toString() as BlockId;

export const parseTemplates = (
  templates: Record<BlockId, Block>,
  parentId: BlockId
): Block[] => {
  const updatedBlocks: Record<BlockId, Block> = {};
  const idsMap: Record<BlockId, BlockId> = {};

  for (const [id, block] of Object.entries(templates)) {
    const id_ = generateBlockId();
    updatedBlocks[id_] = {
      ...block,
      id: id_,
    } as Block;

    idsMap[id as BlockId] = id_;
  }

  return Object.values(updatedBlocks).map((template) => {
    if ("children" in template) {
      return {
        ...template,
        id: template.id as BlockId,
        parentId: idsMap[template.parentId as BlockId] ?? parentId,
        children: template.children.map((child) => idsMap[child]),
      } as Block;
    }

    return {
      ...template,
      id: template.id as BlockId,
      parentId: idsMap[template.parentId as BlockId] ?? parentId,
    } as Block;
  });
};

const generateDefaultStyles = (parentId: BlockId | null) => ({
  id: generateBlockId(),
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  marginBottom: 0,
  width: 100,
  parentId,
});

const generateChildren = (
  type: BlockType,
  amount: number,
  parentId: BlockId
) => {
  const children: Block[] = [];
  const directChildrenIds: BlockId[] = [];

  for (let i = 0; i < amount; i++) {
    const child = generateBlocks(type, parentId);
    children.push(...child);
    directChildrenIds.push(child[0].id);
  }

  return { children, directChildrenIds };
};

export const generateBlocks = <Type extends BlockType>(
  type: Type,
  parentId: BlockId | null,
  childrenCount: number = 2
): Block[] => {
  switch (type) {
    case BlockTypeDefinitions.Root:
      return [
        {
          ...generateDefaultStyles(parentId),
          type,
          children: [] as BlockId[],
          parentId: null,
          marginLeft: 54,
          marginRight: 54,
          marginTop: 54,
          marginBottom: 54,
        },
      ] satisfies [RootBlock];
    case BlockTypeDefinitions.Text:
      return [
        {
          ...generateDefaultStyles(parentId),
          type,
          content: "Placeholder text",
          color: "#000000",
          bold: false,
          italic: false,
          underline: false,
          fontSize: 16,
          fontFamily: "Roboto",
        },
      ] satisfies [TextBlock];
    case BlockTypeDefinitions.Line:
      return [
        {
          ...generateDefaultStyles(parentId),
          type,
          height: 4,
          color: "#000",
        },
      ] satisfies [LineBlock];
    case BlockTypeDefinitions.Image:
      return [
        {
          ...generateDefaultStyles(parentId),
          type,
          content: "",
          ratio: 1,
        },
      ] satisfies [ImageBlock];
    case BlockTypeDefinitions.Column:
      return [
        {
          ...generateDefaultStyles(parentId),
          type,
          children: [] as BlockId[],
        },
      ] satisfies [ColumnBlock];
    case BlockTypeDefinitions.ColumnGroup: {
      const groupBaseStyles = generateDefaultStyles(parentId);

      const { children, directChildrenIds } = generateChildren(
        BlockTypeDefinitions.Column,
        childrenCount,
        groupBaseStyles.id
      );

      const group = {
        ...groupBaseStyles,
        type,
        children: directChildrenIds,
        gap: 10,
      } satisfies ColumnGroupBlock;

      return [group, ...children] satisfies Block[];
    }
    case BlockTypeDefinitions.Break: {
      return [
        {
          ...generateDefaultStyles(parentId),
          type,
        },
      ] satisfies [BreakBlock];
    }
    case BlockTypeDefinitions.PageOrientation: {
      return [
        {
          ...generateDefaultStyles(parentId),
          type,
          orientation: "portrait",
          children: [],
        },
      ] satisfies [PageOrientationBlock];
    }
    case BlockTypeDefinitions.Table: {
      const groupBaseStyles = generateDefaultStyles(parentId);

      const { children, directChildrenIds } = generateChildren(
        BlockTypeDefinitions.TableRow,
        childrenCount,
        groupBaseStyles.id
      );

      const group = {
        ...groupBaseStyles,
        type,
        children: directChildrenIds,
        paddingLeft: 7,
        paddingRight: 7,
        paddingTop: 7,
        paddingBottom: 7,
      } satisfies TableBlock;

      return [group, ...children] satisfies Block[];
    }
    case BlockTypeDefinitions.TableRow: {
      const rowBaseStyles = generateDefaultStyles(parentId);

      const { children, directChildrenIds } = generateChildren(
        BlockTypeDefinitions.TableCell,
        childrenCount,
        rowBaseStyles.id
      );

      return [
        {
          ...rowBaseStyles,
          type,
          children: directChildrenIds,
        },
        ...children,
      ] satisfies Block[];
    }
    case BlockTypeDefinitions.TableCell: {
      return [
        {
          ...generateDefaultStyles(parentId),
          type,
          children: [] as BlockId[],
        },
      ] satisfies [TableCellBlock];
    }
    case BlockTypeDefinitions.Header:
    case BlockTypeDefinitions.Footer: {
      return [
        {
          ...generateDefaultStyles(parentId),
          type,
          children: [] as BlockId[],
        },
      ];
    }
    default:
      throw new Error(`Unsupported block type: ${type}`);
  }
};
