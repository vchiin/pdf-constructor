import { useMemo } from "react";
import {
  BaseBlockThumbnailProps,
  BlockThumbnailMap,
} from "./shared/types/block-thumbnail.types";
import { GenericBlockType } from "@/components/pdf-constructor/shared/constants/types-definition.constant";

type BlockThumbnailList = {
  blocks: BlockThumbnailMap;
};

export const BlockThumbnailList = ({ blocks }: BlockThumbnailList) => {
  const thumbnailList = useMemo(() => {
    return Object.entries(blocks).map(([key, value]) => ({
      key,
      value,
    }));
  }, [blocks]);

  return (
    <div className="grid gap-1 @xs:grid-cols-2 @sm:grid-cols-2">
      {thumbnailList.map(({ key: type, value: Element }) => {
        const Block = Element as React.FC<
          BaseBlockThumbnailProps<GenericBlockType>
        >;

        return <Block type={type as GenericBlockType} key={type} />;
      })}
    </div>
  );
};
