import { useMemo } from "react";
import { BlockId } from "../../shared/types/utils.types";
import {
  findBlock,
  findChildrenBlocks,
  hasChild,
} from "./pdf-constructor-context.utils";
import { useConstructor } from "./pdf-constructor.context";
import { BlockType } from "../../shared/constants/types-definition.constant";
import { Block, ContainerBlock } from "../../shared/types/block.types";

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

export const useBlockTypedChild = <T extends BlockType>(
  type: T,
  parent: ContainerBlock<BlockType>
): Extract<Block, { type: T }> | null => {
  const { map } = useConstructor();

  return useMemo(() => {
    for (const blockId of parent.children) {
      const block = findBlock(blockId, map);

      if (!block) {
        continue;
      }

      if (block.type === type) {
        return block as Extract<Block, { type: T }>;
      }
    }

    return null;
  }, [type, parent.children, map]);
};
