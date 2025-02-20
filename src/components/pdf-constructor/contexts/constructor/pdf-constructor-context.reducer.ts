import {
  ActionTypes,
  ConstructorAction,
  ConstructorState,
} from "./pdf-constructor-context.types";
import {
  createBlock,
  deleteBlock,
  insertBlock,
  moveBlock,
  moveBlockToPlaceholder,
  swapBlock,
  updateBlock,
  updateChildrenWidths,
} from "./pdf-constructor-context.utils";

export const constructorReducer = (
  state: ConstructorState,
  action: ConstructorAction
) => {
  switch (action.type) {
    case ActionTypes.SELECT_BLOCK: {
      state.selectedBlockId = action.payload.blockId;
      break;
    }
    case ActionTypes.DESELECT_BLOCK: {
      state.selectedBlockId = null;
      break;
    }
    case ActionTypes.CREATE_BLOCK: {
      action.payload.blocks.forEach((block) =>
        createBlock(
          block,
          action.payload.overId,
          action.payload.direction,
          state.map
        )
      );
      break;
    }
    case ActionTypes.UPDATE_BLOCK: {
      updateBlock(action.payload.block, state.map);
      break;
    }
    case ActionTypes.DELETE_BLOCK: {
      deleteBlock(action.payload.blockId, state.map);
      break;
    }
    case ActionTypes.UPDATE_CHILDREN_WIDTHS: {
      updateChildrenWidths(
        action.payload.blockId,
        action.payload.widths,
        state.map
      );
      break;
    }
    case ActionTypes.MOVE_BLOCK: {
      if (action.payload.targetId) {
        moveBlock(
          action.payload.blockId,
          action.payload.targetId,
          action.payload.direction,
          state.map
        );
        return;
      }

      if (!action.payload.targetParentId) {
        return;
      }

      moveBlockToPlaceholder(
        action.payload.blockId,
        action.payload.targetParentId,
        state.map
      );
      break;
    }
    case ActionTypes.TOGGLE_PREVIEW: {
      state.showPreview = !state.showPreview;
      break;
    }
    case ActionTypes.FILL_TABLE_CELLS: {
      action.payload.cells.forEach((cell) =>
        insertBlock(
          cell,
          action.payload.index,
          action.payload.direction,
          state.map
        )
      );
      break;
    }
    case ActionTypes.SWAP_BLOCK: {
      swapBlock(action.payload.blockId, action.payload.targetId, state.map);
      break;
    }
  }
};
