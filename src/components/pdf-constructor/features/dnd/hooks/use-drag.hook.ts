import { useEffect, useRef, useState } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { DragPayload } from "../types/payload.types";

type Options = {
  separatedHandle?: boolean;
};

type State =
  | {
      type: "idle";
    }
  | {
      type: "preview";
      container: HTMLElement | null;
    };

export const useDrag = <
  Element extends HTMLElement,
  Handle extends HTMLElement = HTMLElement,
>(
  data: DragPayload,
  options: Options = { separatedHandle: false }
) => {
  const ref = useRef<Element>(null);
  const [dragHandleRef, setDragHandleRef] = useState<Handle | null>(null);
  const [dragging, setDragging] = useState<State>({
    type: "idle",
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    if (options.separatedHandle) {
      const handleElement = dragHandleRef;

      if (!handleElement) {
        return;
      }

      return draggable({
        element,
        dragHandle: handleElement,
        onGenerateDragPreview({ nativeSetDragImage }) {
          console.log("generating preview");
          // We need to make sure that the element not obfuscated by the sticky header
          setCustomNativeDragPreview({
            render({ container }) {
              setDragging({ type: "preview", container });
              return () => setDragging({ type: "idle" });
            },
            nativeSetDragImage,
          });
        },
        // might cause issues here, be cautious
        getInitialData: () => data,
        // onDrop: () => setDragging(false),
      });
    }

    return draggable({
      element,
      // might cause issues here, be cautious
      getInitialData: () => data,
      onDragStart: () =>
        setDragging({
          type: "preview",
          container: null,
        }),
      onDrop: () =>
        setDragging({
          type: "idle",
        }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragHandleRef]);

  return [ref, { dragging, dragHandleRef: setDragHandleRef }] as const;
};
