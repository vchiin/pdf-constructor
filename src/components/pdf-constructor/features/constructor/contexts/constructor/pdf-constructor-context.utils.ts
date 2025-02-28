import { fetchTemplates } from "@/libs/templates";

import {
  generateBlocks,
  parseTemplates,
} from "@/components/pdf-constructor/features/constructor/services/block.service";
import { canBeChildOf } from "@/components/pdf-constructor/features/constructor/services/interactions/interactions.service";
import {
  DragTargetType,
  DropAreaType,
} from "@/components/pdf-constructor/features/constructor/services/interactions/interactions.types";
import { Edge } from "@/components/pdf-constructor/features/constructor/services/interactions/interactions.types";
import {
  BlockType,
  BlockTypeDefinitions,
} from "@/components/pdf-constructor/features/core/constants/types-definition.constant";
import { GenericBlockType } from "@/components/pdf-constructor/features/core/constants/types-definition.constant";

import {
  Block,
  BlockMap,
} from "@/components/pdf-constructor/features/core/types/block.types";
import {
  InsertionPlace,
  ActionTypes,
  ConstructorAction,
  DragTargetCallback,
  DropAreaHandlers,
  DropAreaCallback,
  DragTargetHandlers,
} from "./pdf-constructor-context.types";
import {
  findBlock,
  findChildrenBlocks,
  findParentBlock,
  isContainerBlock,
  createBlock,
  insertBlock,
} from "../../../core/utils/operation.utils";
import { BlockId } from "@/components/pdf-constructor/shared/types/utils.types";

// Actions

export const createBlockAction = (
  block: Block,
  overId: Block["id"] | null,
  direction: (typeof InsertionPlace)[keyof typeof InsertionPlace] | null,
  blocks: BlockMap
) => {
  if (block.parentId === null) {
    return;
  }

  const parentBlock = findBlock(block.parentId, blocks);

  if (!parentBlock || !isContainerBlock(parentBlock)) {
    return;
  }

  if (overId === null) {
    createBlock({
      block,
      parent: parentBlock,
      blocks,
    });
    return;
  }

  const index = parentBlock.children.indexOf(overId);

  if (index === -1) {
    return;
  }

  const finalIndex = index + (direction === InsertionPlace.BEFORE ? 0 : 1);
  insertBlock({
    block,
    parent: parentBlock,
    blocks,
    position: finalIndex,
  });
};

export const insertBlockAction = (
  block: Block,
  index: number,
  direction: (typeof InsertionPlace)[keyof typeof InsertionPlace],
  blocks: BlockMap
) => {
  if (!block.parentId) {
    return;
  }

  const parent = findBlock(block.parentId, blocks);

  if (!parent || !isContainerBlock(parent)) {
    return;
  }

  const finalIndex =
    direction === InsertionPlace.BEFORE
      ? index
      : index + (direction === InsertionPlace.AFTER ? 1 : 0);

  insertBlock({
    block,
    parent,
    blocks,
    position: finalIndex,
  });
};

export const updateBlockAction = (block: Block, blocks: BlockMap) => {
  blocks[block.id] = block;
};

export const deleteChildBlock = (
  childId: BlockId,
  parentId: Block["id"],
  blocks: BlockMap
) => {
  const block = findBlock(childId, blocks);
  const parent = findBlock(parentId, blocks);

  // only root has no parent
  if (block === null || parent === null) {
    return;
  }

  if (parent && isContainerBlock(parent)) {
    parent.children = parent.children.filter((id) => id !== childId);
  }

  if (isContainerBlock(block)) {
    block.children.forEach((childId) => deleteBlockAction(childId, blocks));
  }

  delete blocks[childId];
};

export const deleteBlockAction = (id: BlockId, blocks: BlockMap) => {
  const block = findBlock(id, blocks);

  // only root has no parent
  if (!block || block.parentId === null) {
    return;
  }

  if (block.type === BlockTypeDefinitions.TableCell) {
    const row = findParentBlock(block.id, blocks);

    if (row && isContainerBlock(row)) {
      const cellIndex = row.children.indexOf(block.id);
      const cellLength = row.children.length;

      if (cellIndex !== -1 && row.parentId) {
        const rows = findChildrenBlocks(row.parentId, blocks);

        rows.forEach((tableRow) => {
          if (
            tableRow.type !== BlockTypeDefinitions.TableRow ||
            tableRow.id === row.id
          ) {
            return;
          }

          if (tableRow.children.length >= cellLength) {
            deleteChildBlock(tableRow.children[cellIndex], tableRow.id, blocks);
          }
        });
      }
    }
  }

  deleteChildBlock(id, block.parentId, blocks);
};

const moveInSameContainer = (
  blockId: BlockId,
  overId: BlockId,
  direction: (typeof InsertionPlace)[keyof typeof InsertionPlace],
  blocks: BlockMap
) => {
  const parent = findParentBlock(blockId, blocks);

  if (!parent || !isContainerBlock(parent)) {
    return;
  }

  const targetIndex = parent.children.indexOf(blockId);

  if (targetIndex === -1) {
    return;
  }

  parent.children.splice(targetIndex, 1);

  const overIndex = parent.children.indexOf(overId);

  if (overIndex === -1) {
    parent.children.splice(targetIndex, 0, blockId);
    return;
  }

  const insertIndex =
    direction === InsertionPlace.BEFORE ? overIndex : overIndex + 1;

  parent.children.splice(insertIndex, 0, blockId);
};

const moveToDifferentContainer = (
  blockId: BlockId,
  overId: BlockId,
  direction: (typeof InsertionPlace)[keyof typeof InsertionPlace],
  blocks: BlockMap
) => {
  const parent = findParentBlock(blockId, blocks);
  const targetParent = findParentBlock(overId, blocks);

  if (
    !parent ||
    !isContainerBlock(parent) ||
    !targetParent ||
    !isContainerBlock(targetParent)
  ) {
    return;
  }

  const targetIndex = parent.children.indexOf(blockId);
  const overIndex = targetParent.children.indexOf(overId);

  if (targetIndex === -1) {
    return;
  }
  const block = findBlock(blockId, blocks);

  if (!block) {
    return;
  }

  parent.children.splice(targetIndex, 1);

  const insertIndex =
    direction === InsertionPlace.BEFORE ? overIndex : overIndex + 1;

  insertBlock({
    block,
    parent: targetParent,
    position: insertIndex,
    blocks,
  });
};

export const moveBlockAction = (
  blockId: BlockId,
  targetId: BlockId,
  direction: (typeof InsertionPlace)[keyof typeof InsertionPlace],
  blocks: BlockMap
) => {
  const block = findBlock(blockId, blocks);
  const target = findBlock(targetId, blocks);

  if (!block || !target) {
    return;
  }

  if (block.parentId === target.parentId) {
    moveInSameContainer(blockId, targetId, direction, blocks);
  } else {
    moveToDifferentContainer(blockId, targetId, direction, blocks);
  }
};

export const moveBlockToPlaceholderAction = (
  blockId: BlockId,
  targetParentId: BlockId,
  blocks: BlockMap
) => {
  const parent = findParentBlock(blockId, blocks);
  const targetParent = findBlock(targetParentId, blocks);

  if (
    !parent ||
    !targetParent ||
    !isContainerBlock(targetParent) ||
    !isContainerBlock(parent)
  ) {
    return;
  }

  const block = findBlock(blockId, blocks);
  if (!block) {
    return;
  }

  const blockIndex = parent.children.indexOf(blockId);
  parent.children.splice(blockIndex, 1);

  createBlock({
    block,
    parent: targetParent,
    blocks,
  });
};

export const updateChildrenWidthsAction = (
  blockId: BlockId,
  widths: number[],
  blocks: BlockMap
) => {
  const block = findBlock(blockId, blocks);

  if (!block || !isContainerBlock(block)) {
    return;
  }

  block.children.forEach((childId, index) => {
    const child = findBlock(childId, blocks);

    if (!child) {
      return;
    }

    child.width = widths[index];
  });
};

export const swapBlockAction = (
  blockId: BlockId,
  targetId: BlockId,
  blocks: BlockMap
) => {
  const block = findBlock(blockId, blocks);
  const target = findBlock(targetId, blocks);

  if (!block || !target) {
    return;
  }

  const parent = findParentBlock(blockId, blocks);
  const targetParent = findParentBlock(targetId, blocks);

  if (
    !parent ||
    !targetParent ||
    !isContainerBlock(parent) ||
    !isContainerBlock(targetParent)
  ) {
    return;
  }

  const blockIndex = parent.children.indexOf(blockId);
  const targetIndex = targetParent.children.indexOf(targetId);

  if (blockIndex === -1 || targetIndex === -1) {
    return;
  }

  parent.children[blockIndex] = targetId;
  targetParent.children[targetIndex] = blockId;

  block.parentId = targetParent.id;
  target.parentId = parent.id;
};

// Drop Area Callbacks

const getMoveBlockDirection = (edge: Edge) => {
  const beforeDirection: Edge[] = ["top", "left"];

  if (beforeDirection.includes(edge)) {
    return InsertionPlace.BEFORE;
  }

  return InsertionPlace.AFTER;
};

const handleTableCellInsertion = (
  activeType: GenericBlockType,
  cellId: BlockId | null,
  rowId: BlockId,
  blocks: BlockMap
) => {
  if (activeType !== BlockTypeDefinitions.TableCell) {
    return null;
  }

  const row = findBlock(rowId, blocks);

  if (!row || row.type !== BlockTypeDefinitions.TableRow) {
    return null;
  }

  const table = findParentBlock(rowId, blocks);

  if (!table || table.type !== BlockTypeDefinitions.Table) {
    return null;
  }

  const otherRows = table.children.filter((tableRow) => rowId !== tableRow);

  const cellIndex = cellId !== null ? row.children.indexOf(cellId) : 0;

  if (cellIndex === -1) {
    return null;
  }

  const cells = otherRows.flatMap((row) =>
    generateBlocks(BlockTypeDefinitions.TableCell, row)
  );

  return {
    cells,
    index: cellIndex,
  };
};

const prepareBlockCreation: DragTargetCallback<DragTargetType> = ({
  active,
  over,
  parentId,
  direction,
  blocks,
}) => {
  switch (active.elementType) {
    case BlockTypeDefinitions.TableCell: {
      const cells = handleTableCellInsertion(
        active.elementType,
        over?.id ?? null,
        parentId,
        blocks
      );

      const actions: ConstructorAction[] = [];

      if (cells) {
        actions.push({
          type: ActionTypes.FILL_TABLE_CELLS,
          payload: {
            cells: cells.cells,
            index: cells.index,
            direction,
          },
        });
      }

      actions.push({
        type: ActionTypes.CREATE_BLOCK,
        payload: {
          blocks: generateBlocks(active.elementType, parentId),
          overId: over?.id ?? null,
          direction,
        },
      });

      return actions;
    }
    case BlockTypeDefinitions.TableRow: {
      const table = findBlock(parentId, blocks);

      if (!table || table.type !== BlockTypeDefinitions.Table) {
        return [];
      }

      const rows = findChildrenBlocks(table.id, blocks);

      const columns = rows.reduce((acc, row) => {
        if (row.type !== BlockTypeDefinitions.TableRow) {
          return acc;
        }

        // should always be the same number of columns, but just in case something goes wrong
        return row.children.length > acc ? row.children.length : acc;
      }, 0);

      return [
        {
          type: ActionTypes.CREATE_BLOCK,
          payload: {
            blocks: generateBlocks(active.elementType, parentId, columns),
            overId: over?.id ?? null,
            direction,
          },
        },
      ];
    }
    default: {
      return [
        {
          type: ActionTypes.CREATE_BLOCK,
          payload: {
            blocks: generateBlocks(active.elementType as BlockType, parentId),
            overId: over?.id ?? null,
            direction,
          },
        },
      ];
    }
  }
};

const DragTargetActions: DragTargetHandlers = {
  leaf: ({ active, over, parentId, direction }) => {
    if (
      over &&
      over.type === BlockTypeDefinitions.TableCell &&
      active.elementType === BlockTypeDefinitions.TableCell
    ) {
      return [
        {
          type: ActionTypes.SWAP_BLOCK,
          payload: {
            blockId: active.elementId,
            targetId: over.id,
          },
        },
      ];
    }

    return [
      {
        type: ActionTypes.MOVE_BLOCK,
        payload: {
          blockId: active.elementId,
          targetId: over?.id ?? null,
          targetParentId: parentId,
          direction,
        },
      },
    ];
  },
  block: ({ active, over, parentId, direction }) => {
    if (
      over &&
      over.type === BlockTypeDefinitions.TableCell &&
      active.elementType === BlockTypeDefinitions.TableCell
    ) {
      return [
        {
          type: ActionTypes.SWAP_BLOCK,
          payload: {
            blockId: active.elementId,
            targetId: over.id,
          },
        },
      ];
    }

    return [
      {
        type: ActionTypes.MOVE_BLOCK,
        payload: {
          blockId: active.elementId,
          targetId: over?.id ?? null,
          targetParentId: parentId,
          direction,
        },
      },
    ];
  },
  thumbnail: ({ active, over, parentId, direction, blocks }) => {
    return prepareBlockCreation({
      active,
      over,
      parentId,
      direction,
      blocks,
    });
  },
  template: async ({ active, parentId }) => {
    const template = await fetchTemplates(active.id);
    if (!template) {
      return [];
    }

    return [
      {
        type: ActionTypes.CREATE_BLOCK,
        payload: {
          blocks: parseTemplates(template, parentId),
          // adding to root component
          overId: null,
          direction: InsertionPlace.AFTER,
        },
      },
    ];
  },
};

const getDragTargetAction = <Type extends DragTargetType>(
  type: Type
): DragTargetCallback<Type> => {
  return DragTargetActions[type];
};

const DropAreaCallbacks: DropAreaHandlers = {
  edge: (active, over, blocks) => {
    // templates can't be placed onto edges, only on the top level placeholder
    if (active.targetType === "template") {
      return [];
    }

    const targetParent = findParentBlock(over.elementId, blocks);

    if (!targetParent) {
      return [];
    }

    if (!canBeChildOf(active.elementType, targetParent.type)) {
      return [];
    }

    const dragAction = getDragTargetAction(active.targetType);

    if (!dragAction) {
      return [];
    }

    return dragAction({
      active,
      over: {
        id: over.elementId,
        type: over.elementType,
      },
      parentId: targetParent.id,
      direction: getMoveBlockDirection(over.position),
      blocks,
    });
  },
  placeholder: (active, over, blocks) => {
    if (!canBeChildOf(active.elementType, over.elementType)) {
      return [];
    }

    const dragAction = getDragTargetAction(active.targetType);

    if (!dragAction) {
      return [];
    }

    return dragAction({
      active,
      over: null,
      parentId: over.elementId,
      direction: InsertionPlace.BEFORE,
      blocks,
    });
  },
};

export const getDropAreaCallback = <T extends DropAreaType>(
  areaType: T
): DropAreaCallback<T> => {
  return DropAreaCallbacks[areaType];
};
