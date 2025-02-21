import { GeneralBlockType } from "@/components/pdf-constructor/shared/constants/types-definition.constant";

export type BaseBlockThumbnailProps<T extends GeneralBlockType> = {
  type: T;
};

export type BlockMap = Partial<{
  [K in GeneralBlockType]: React.FC<BaseBlockThumbnailProps<K>>;
}>;
