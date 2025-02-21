import { useMemo } from "react";
import { BlockId } from "../../shared/types/utils.types";
import {
  findBlock,
  findChildrenBlocks,
  hasChild,
} from "./pdf-constructor-context.utils";
import { useConstructor } from "./pdf-constructor.context";

export const useBlockChildren = (id: BlockId) => {
  const { map } = useConstructor();

  return useMemo(() => findChildrenBlocks(id, map), [id, map]);
};

export const useBlock = (id: BlockId) => {
  const { map } = useConstructor();
  return useMemo(() => findBlock(id, map), [id, map]);
};

export const useHasChild = (blockId: BlockId, childId: BlockId | null) => {
  const { map } = useConstructor();
  return useMemo(() => {
    if (childId === null) {
      return false;
    }
    return hasChild(blockId, childId, map);
  }, [blockId, childId, map]);
};
