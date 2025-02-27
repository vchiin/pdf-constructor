import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect, useRef, useState } from "react";

import { DragPayload, DropPayload } from "../types/payload.types";
import {
  canBeSiblingOf,
  isCompatible,
  isSameChild,
  isTargetChild,
} from "../utils/dnd.utils";
import { useConstructor } from "../../constructor/contexts/constructor/pdf-constructor.context";

type DropOptions = {
  onDragEnter?: (drop: DragPayload) => void;
  onDragLeave?: () => void;
  onDrop?: () => void;
};

export const useDrop = <Element extends HTMLElement>(
  data: DropPayload,
  options: DropOptions
) => {
  const { map } = useConstructor();
  const ref = useRef<Element>(null);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    return dropTargetForElements({
      element: element,
      getData: () => data,
      canDrop: ({ source }) => {
        const sourceData = source.data as DragPayload;

        if (
          isSameChild(sourceData, data) ||
          isTargetChild(sourceData, data, map) ||
          !canBeSiblingOf(sourceData, data, map) ||
          !isCompatible(sourceData, data)
        ) {
          return false;
        }

        return true;
      },
      onDragEnter: ({ source }) => {
        const sourceData = source.data as DragPayload;

        if (sourceData && options.onDragEnter) {
          options.onDragEnter(sourceData);
        }

        setIsOver(true);
      },
      onDragLeave: () => {
        if (options.onDragLeave) {
          options.onDragLeave();
        }
        setIsOver(false);
      },
      onDrop: () => {
        if (options.onDrop) {
          options.onDrop();
        }

        setIsOver(false);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, { isOver }] as const;
};
