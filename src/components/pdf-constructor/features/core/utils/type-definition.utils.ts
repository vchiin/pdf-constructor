import {
  BlockType,
  BlockTypeDefinitions,
  GenericBlockType,
} from "../constants/types-definition.constant";

export const isBlockType = (type: GenericBlockType): type is BlockType => {
  return Object.values(BlockTypeDefinitions).includes(type as BlockType);
};
