import { BlockList } from "../block-list.component";
import { TextBlock } from "./text-block.component";
import { ImageBlock } from "./image-block.component";
import { LineBlock } from "./line-block.component";

import { BlockDropzone } from "../../../components/block-dropzone.component";
import { Columns2Icon } from "lucide-react";
import {
  Block as BlockType,
  ColumnBlock as ColumnBlockType,
} from "@/components/pdf-constructor/contexts/constructor/constructor.types";
import { useBlockChildren } from "@/components/pdf-constructor/contexts/constructor/pdf-constructor-context.hooks";
import { BaseBlockProps, BlockProps } from "../shared/types/block.type";
import { Block } from "../block.component";

export const ColumnBlock: React.FC<BlockProps<ColumnBlockType>> = ({
  block,
}) => {
  const children = useBlockChildren(block.id);

  return (
    <Block block={block} positions={["left", "right"]}>
      {children.length === 0 ? (
        <BlockDropzone
          parentId={block.id}
          type={block.type}
          icon={<Columns2Icon className="h-4 w-4" />}
        />
      ) : (
        <BlockList
          config={children}
          blocks={{
            text: TextBlock as React.FC<BaseBlockProps<BlockType>>,
            image: ImageBlock as React.FC<BaseBlockProps<BlockType>>,
            line: LineBlock as React.FC<BaseBlockProps<BlockType>>,
          }}
          className="h-full w-full flex-1 flex-col"
          parent={block}
          hideDropzone
        />
      )}
    </Block>
  );
};
