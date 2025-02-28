import {
  ActionTypes,
  ConstructorAction,
  ConstructorState,
} from "./pdf-constructor-context.types";
import {
  createBlockAction,
  deleteBlockAction,
  insertBlockAction,
  moveBlockAction,
  moveBlockToPlaceholderAction,
  swapBlockAction,
  updateBlockAction,
  updateChildrenWidthsAction,
} from "./pdf-constructor-context.utils";

export const constructorReducer = (
  state: ConstructorState,
  action: ConstructorAction
) => {
  switch (action.type) {
    case ActionTypes.CREATE_BLOCK: {
      action.payload.blocks.forEach((block) =>
        // payload blocks are immutable, so we copy the object
        createBlockAction(
          { ...block },
          action.payload.overId,
          action.payload.direction,
          state.map
        )
      );
      break;
    }
    case ActionTypes.UPDATE_BLOCK: {
      updateBlockAction(action.payload.block, state.map);
      break;
    }
    case ActionTypes.DELETE_BLOCK: {
      deleteBlockAction(action.payload.blockId, state.map);
      break;
    }
    case ActionTypes.UPDATE_CHILDREN_WIDTHS: {
      updateChildrenWidthsAction(
        action.payload.blockId,
        action.payload.widths,
        state.map
      );
      break;
    }
    case ActionTypes.MOVE_BLOCK: {
      if (action.payload.targetId) {
        moveBlockAction(
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

      moveBlockToPlaceholderAction(
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
        insertBlockAction(
          cell,
          action.payload.index,
          action.payload.direction,
          state.map
        )
      );
      break;
    }
    case ActionTypes.SWAP_BLOCK: {
      swapBlockAction(
        action.payload.blockId,
        action.payload.targetId,
        state.map
      );
      break;
    }
  }
};
