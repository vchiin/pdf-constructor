import { createContext, useCallback, useContext, useEffect } from "react";

import {
  ActionTypes,
  ConstructorAction,
  ConstructorContext as ConstructorContextType,
  ConstructorState,
} from "./pdf-constructor-context.types";
import { constructorReducer } from "./pdf-constructor-context.reducer";
import { useImmerReducer } from "use-immer";

import { getDropAreaCallback } from "./pdf-constructor-context.utils";
import { generateBlocks } from "@/components/pdf-constructor/features/constructor/services/block.service";
import {
  Block,
  RootBlock,
} from "@/components/pdf-constructor/shared/types/block.types";
import { BlockId } from "@/components/pdf-constructor/shared/types/utils.types";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";

import { DragPayload, DropPayload } from "../../../dnd/types/payload.types";

const ConstructorContext = createContext<ConstructorContextType | null>(null);

const root = generateBlocks("root", null)[0] as RootBlock;
const header = generateBlocks("header", root.id)[0];
// const footer = generateBlocks("footer", root.id)[0];

root.children.push(header.id);
// root.children.push(footer.id);

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
      // [footer.id]: footer,
    },
    rootId: root.id,
    showPreview: false,
    scale: 1,
  });

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

  useEffect(() => {
    return combine(
      monitorForElements({
        onDrop: async ({ source, location }) => {
          const destination = location.current.dropTargets[0];
          if (!destination) {
            return;
          }

          const drag = source.data as DragPayload;
          const drop = destination.data as DropPayload;

          const dropAreaCallback = getDropAreaCallback(drop.areaType);
          if (!dropAreaCallback) {
            return;
          }
          const actions = await dropAreaCallback(drag, drop, state.map);

          await Promise.allSettled(actions.map((action) => dispatch(action)));
        },
      })
    );
  }, [state.map, dispatch]);

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
      {children}
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
