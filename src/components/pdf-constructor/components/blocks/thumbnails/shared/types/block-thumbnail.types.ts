import { BlockType } from "@/components/pdf-constructor/shared/constants/types-definition.constant";

export type BaseBlockThumbnailProps<T extends BlockType> = {
  type: T;
};

export type BlockMap = Partial<{
  [K in BlockType]: React.FC<BaseBlockThumbnailProps<K>>;
}>;
