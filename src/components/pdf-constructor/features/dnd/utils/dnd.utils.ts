import { BlockMap } from "@/components/pdf-constructor/features/core/types/block.types";
import { DragPayload, DropPayload } from "../types/payload.types";

import { canBeChildOf } from "../../constructor/services/interactions/interactions.service";
import {
  findParentBlock,
  hasDescendant,
} from "../../core/utils/operation.utils";

export const isSameChild = (drag: DragPayload, drop: DropPayload) => {
  // thumbnails are not droppable, therefore they can never be attempted to be dropped inside themselves
  // templates are basically thumbnails (they exist as templates while they are in the sidebar, after they are dropped, they become a set of blocks), therefore same logic as above
  if (drag.targetType === "template" || drag.targetType === "thumbnail") {
    return false;
  }

  // placeholders are not draggable (therefore same reasoning as above)
  if (drop.areaType === "placeholder") {
    return false;
  }

  if (drag.elementType !== drop.elementType) {
    return false;
  }

  if (drag.elementId === drop.elementId) {
    return true;
  }

  return false;
};

export const isTargetChild = (
  drag: DragPayload,
  drop: DropPayload,
  blocks: BlockMap
) => {
  // this should be used only for already added elements, therefore only blocks and leafs
  if (drag.targetType === "template" || drag.targetType === "thumbnail") {
    return false;
  }

  return hasDescendant(drop.elementId, drag.elementId, blocks);
};

export const canBeSiblingOf = (
  drag: DragPayload,
  drop: DropPayload,
  blocks: BlockMap
) => {
  // should affect only edges
  if (drop.areaType === "placeholder") {
    return canBeChildOf(drag.elementType, drop.elementType);
  }

  const container = findParentBlock(drop.elementId, blocks);
  if (!container) {
    return false;
  }

  return canBeChildOf(drag.elementType, container.type);
};

export const isCompatible = (drag: DragPayload, drop: DropPayload) => {
  // placeholder can't contain leafs
  if (drop.areaType === "placeholder" && drag.targetType === "leaf") {
    return false;
  }

  if (
    drag.targetType === "leaf" &&
    drop.areaType === "edge" &&
    drop.areaSubtype !== "leaf"
  ) {
    return false;
  }

  if (
    drag.targetType !== "leaf" &&
    drop.areaType === "edge" &&
    drop.areaSubtype === "leaf"
  ) {
    return false;
  }

  return true;
};
