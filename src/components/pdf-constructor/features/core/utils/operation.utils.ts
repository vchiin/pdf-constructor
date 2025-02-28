import { BlockId } from "@/components/pdf-constructor/shared/types/utils.types";
import { BlockType } from "../constants/types-definition.constant";
import { Block, BlockMap, ContainerBlock } from "../types/block.types";

export const findBlock = (id: BlockId, blocks: BlockMap) => {
  return blocks[id];
};

export const findParentBlock = (id: BlockId, blocks: BlockMap) => {
  const block = findBlock(id, blocks);

  if (!block.parentId) {
    return null;
  }

  return findBlock(block.parentId, blocks);
};

type CreateBlockProps = {
  block: Block;
  parent: ContainerBlock<BlockType>;
  blocks: BlockMap;
};

export const createBlock = ({ block, parent, blocks }: CreateBlockProps) => {
  blocks[block.id] = block;
  block.parentId = parent.id;

  if (parent.children.includes(block.id)) {
    return;
  }

  // if parent is root
  if (parent.parentId === null) {
    const index = parent.children.length - 1;
    parent.children = [
      ...parent.children.slice(0, index),
      block.id,
      ...parent.children.slice(index),
    ];
  } else {
    parent.children.push(block.id);
  }
};

export type InsertBlockProps = CreateBlockProps & {
  position: number;
};

export const insertBlock = ({
  block,
  parent,
  blocks,
  position,
}: InsertBlockProps) => {
  blocks[block.id] = block;
  block.parentId = parent.id;

  // if parent is root
  if (parent.parentId === null) {
    // the last element of the root is footer, so we can't insert anything after it
    const finalPosition = Math.min(position, parent.children.length - 1);

    parent.children = [
      ...parent.children.slice(0, finalPosition),
      block.id,
      ...parent.children.slice(finalPosition),
    ];
  } else {
    parent.children = [
      ...parent.children.slice(0, position),
      block.id,
      ...parent.children.slice(position),
    ];
  }
};

export const isContainerBlock = (
  block: Block
): block is Block & { children: BlockId[] } => {
  return "children" in block;
};

export const findChildrenBlocks = (id: BlockId, blocks: BlockMap) => {
  const block = findBlock(id, blocks);

  if (!isContainerBlock(block)) {
    return [];
  }

  return block.children.map((childId) => findBlock(childId, blocks));
};

export const hasChild = (
  blockId: BlockId,
  childId: BlockId,
  blocks: BlockMap
): boolean => {
  const block = findBlock(blockId, blocks);

  if (!isContainerBlock(block)) {
    return false;
  }

  if (block.children.includes(childId)) {
    return true;
  }

  return block.children.some((blockChildId) =>
    hasChild(blockChildId, childId, blocks)
  );
};

export const hasDescendant = (
  descendantId: BlockId,
  parentId: BlockId,
  blocks: BlockMap
): boolean => {
  const parent = findBlock(parentId, blocks);

  if (!parent || !isContainerBlock(parent)) {
    return false;
  }

  const containsDescendant = parent.children.includes(descendantId);
  if (containsDescendant) {
    return true;
  }

  return parent.children.some((child) =>
    hasDescendant(descendantId, child, blocks)
  );
};
