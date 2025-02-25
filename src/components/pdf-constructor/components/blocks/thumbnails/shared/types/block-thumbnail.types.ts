import { GenericBlockType } from "@/components/pdf-constructor/shared/constants/types-definition.constant";

export type BaseBlockThumbnailProps<T extends GenericBlockType> = {
  type: T;
};

export type BlockThumbnailMap = Partial<{
  [K in GenericBlockType]: React.FC<BaseBlockThumbnailProps<K>>;
}>;
