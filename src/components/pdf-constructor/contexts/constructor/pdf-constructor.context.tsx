import { createContext, useCallback, useContext } from "react";

import {
  ActionTypes,
  ConstructorAction,
  ConstructorContext as ConstructorContextType,
  ConstructorState,
} from "./pdf-constructor-context.types";
import { constructorReducer } from "./pdf-constructor-context.reducer";
import { useImmerReducer } from "use-immer";
import {
  DndContext,
  DragEndEvent,
  DroppableContainer,
  KeyboardSensor,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  DragPayload,
  DropPayload,
} from "../../components/blocks/base/shared/types/element.types";
import { DropAreaId } from "../../services/interactions/interactions.types";
import { getDropAreaType } from "../../services/interactions/interactions.service";
import { getDropAreaCallback } from "./pdf-constructor-context.utils";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { generateBlocks } from "../../services/block.service";
import { Block, RootBlock } from "../../shared/types/block.types";
import { BlockId } from "../../shared/types/utils.types";
import { DragPreview } from "./components/drag-preview.component";

const ConstructorContext = createContext<ConstructorContextType | null>(null);

const root = generateBlocks("root", null)[0] as RootBlock;
const header = generateBlocks("header", root.id)[0];
const footer = generateBlocks("footer", root.id)[0];

root.children.push(header.id);
root.children.push(footer.id);

export const ConstructorProvider = ({
  children,
  containerRef,
}: {
  children: React.ReactNode;
  containerRef: React.RefObject<HTMLDivElement>;
}) => {
  const [state, dispatch] = useImmerReducer<
    ConstructorState,
    ConstructorAction
  >(constructorReducer, {
    map: {
      [root.id]: root,
      [header.id]: header,
      [footer.id]: footer,
    },
    rootId: root.id,
    showPreview: false,
    scale: 1,
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const update = useCallback(
    (block: Block) => {
      dispatch({
        type: ActionTypes.UPDATE_BLOCK,
        payload: { block },
      });
    },
    [dispatch]
  );

  const deleteBlock = useCallback(
    (blockId: BlockId) => {
      dispatch({
        type: ActionTypes.DELETE_BLOCK,
        payload: { blockId },
      });
    },
    [dispatch]
  );

  const updateChildrenWidths = useCallback(
    (blockId: BlockId, widths: number[]) => {
      dispatch({
        type: ActionTypes.UPDATE_CHILDREN_WIDTHS,
        payload: { blockId, widths },
      });
    },
    [dispatch]
  );

  const setScale = useCallback(
    (value: number) => {
      dispatch({
        type: ActionTypes.SET_SCALE,
        payload: { scale: value },
      });
    },
    [dispatch]
  );

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over, collisions } = event;
      if (!over || active.id === over.id) {
        return;
      }
      if (!collisions) {
        return;
      }
      const activePayload = active.data?.current as DragPayload;
      for (const collision of collisions) {
        const collisionData = collision.data as {
          droppableContainer: DroppableContainer;
          value: number;
        };
        const over = collisionData.droppableContainer;
        const overPayload = over.data.current as DropPayload;
        const overId = over.id as DropAreaId;
        const [overAreaType, overEdge] = getDropAreaType(overId);
        const dropAreaCallback = getDropAreaCallback(overAreaType);
        if (!dropAreaCallback) {
          return;
        }
        const actions = await dropAreaCallback(
          activePayload,
          overPayload,
          state.map,
          {
            edge: overEdge,
          }
        );
        await Promise.allSettled(actions.map((action) => dispatch(action)));
        return;
      }
    },
    [dispatch, state.map]
  );

  const togglePreview = useCallback(() => {
    dispatch({
      type: ActionTypes.TOGGLE_PREVIEW,
      payload: undefined,
    });
  }, [dispatch]);

  return (
    <ConstructorContext.Provider
      value={{
        ...state,
        update,
        deleteBlock,
        updateChildrenWidths,
        togglePreview,
        containerRef,
        setScale,
      }}
    >
      <DndContext
        onDragEnd={handleDragEnd}
        sensors={sensors}
        collisionDetection={pointerWithin}
      >
        {children}

        <DragPreview />
      </DndContext>
    </ConstructorContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useConstructor = () => {
  const state = useContext(ConstructorContext);

  if (!state) {
    throw new Error("Constructor context not found");
  }

  return state;
};
