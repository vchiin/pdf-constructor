import { BlockList } from "../block-list.component";
import { TextBlock } from "./text-block.component";
import { ImageBlock } from "./image-block.component";
import { LineBlock } from "./line-block.component";

import { BlockDropzone } from "../../../components/block-dropzone.component";
import {
  Block as BlockType,
  PageOrientationBlock as PageOrientationBlockType,
} from "@/components/pdf-constructor/contexts/constructor/constructor.types";
import { useBlockChildren } from "@/components/pdf-constructor/contexts/constructor/pdf-constructor-context.hooks";
import { BaseBlockProps, BlockProps } from "../shared/types/block.type";
import { Block } from "../block.component";
import { convertPtToPx } from "@/shared/utils/units.utils";
import { PAGE_HEIGHT_PT } from "@/libs/pdfmake";
import { useConstructor } from "@/components/pdf-constructor/contexts/constructor/pdf-constructor.context";
import { BlockTypeDefinitions } from "@/components/pdf-constructor/shared/constants/types-definition.constant";
import { ColumnGroupBlock } from "./column-group-block.component";
import { BreakBlock } from "./break-block.component";
import { TableBlock } from "./table/table-block.component";
import { CSSProperties } from "react";
import { PageOrientationBlockToolbar } from "../toolbars/page-orientation-toolbar.component";

export const PageOrientationBlock: React.FC<
  BlockProps<PageOrientationBlockType>
> = ({ block }) => {
  const { showPreview, scale } = useConstructor();
  const children = useBlockChildren(block.id);

  const styles: CSSProperties =
    block.orientation === "landscape"
      ? {
          width: `${convertPtToPx(PAGE_HEIGHT_PT) * scale}px`,
        }
      : {};

  return (
    <Block
      block={block}
      className="overflow-x-auto"
      style={styles}
      toolbar={<PageOrientationBlockToolbar block={block} />}
    >
      <BlockList
        config={children}
        blocks={{
          [BlockTypeDefinitions.Text]: TextBlock as React.FC<
            BaseBlockProps<BlockType>
          >,
          [BlockTypeDefinitions.Line]: LineBlock as React.FC<
            BaseBlockProps<BlockType>
          >,
          [BlockTypeDefinitions.Image]: ImageBlock as React.FC<
            BaseBlockProps<BlockType>
          >,
          [BlockTypeDefinitions.ColumnGroup]: ColumnGroupBlock as React.FC<
            BaseBlockProps<BlockType>
          >,
          [BlockTypeDefinitions.Break]: BreakBlock as React.FC<
            BaseBlockProps<BlockType>
          >,
          [BlockTypeDefinitions.Table]: TableBlock as React.FC<
            BaseBlockProps<BlockType>
          >,
        }}
        className="h-full w-full flex-1 flex-col"
        parent={block}
        hideDropzone
      />
      {!showPreview && <BlockDropzone parentId={block.id} type={block.type} />}
    </Block>
  );
};
