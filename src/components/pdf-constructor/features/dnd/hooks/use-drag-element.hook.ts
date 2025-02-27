import { useEffect, useRef, useState } from "react";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { DragPayload } from "../types/payload.types";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";

type State =
  | {
      type: "idle";
    }
  | {
      type: "preview";
      container: HTMLElement | null;
    }
  | {
      type: "over";
    };

export const useDragElement = <
  Element extends HTMLElement,
  Handle extends HTMLElement = HTMLElement,
>(
  data: DragPayload
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

    const handleElement = dragHandleRef;

    if (!handleElement) {
      return dropTargetForElements({
        element,
        canDrop: ({ source }) => !source.element.isSameNode(element),
        onDragEnter: () => {
          if (dragging.type !== "preview") {
            setDragging({ type: "over" });
          }
        },
        onDragLeave: () => {
          if (dragging.type !== "preview") {
            setDragging({ type: "idle" });
          }
        },
        onDrop: () => {
          if (dragging.type !== "preview") {
            setDragging({ type: "idle" });
          }
        },
      });
    }

    return combine(
      draggable({
        element,
        dragHandle: handleElement,
        onGenerateDragPreview({ nativeSetDragImage }) {
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
      }),
      dropTargetForElements({
        element,
        canDrop: ({ source }) => !source.element.isSameNode(element),
        onDragEnter: () => {
          if (dragging.type !== "preview") {
            setDragging({ type: "over" });
          }
        },
        onDragLeave: () => {
          if (dragging.type !== "preview") {
            setDragging({ type: "idle" });
          }
        },
        onDrop: () => {
          if (dragging.type !== "preview") {
            setDragging({ type: "idle" });
          }
        },
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragHandleRef]);

  return [ref, { dragging, dragHandleRef: setDragHandleRef }] as const;
};
