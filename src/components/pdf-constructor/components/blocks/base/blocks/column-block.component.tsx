import { withBlock } from "../../base/block.component";

import { BlockList } from "../block-list.component";
import { TextBlock } from "./text-block.component";
import { ImageBlock } from "./image-block.component";
import { LineBlock } from "./line-block.component";

import { BlockDropzone } from "../../../components/block-dropzone.component";
import { Columns2Icon } from "lucide-react";
import {
  Block,
  ColumnBlock as ColumnBlockType,
} from "@/components/pdf-constructor/contexts/constructor/constructor.types";
import { useBlockChildren } from "@/components/pdf-constructor/contexts/constructor/pdf-constructor-context.hooks";
import { BaseBlockProps } from "../shared/types/block.type";

export const ColumnBlock = withBlock<ColumnBlockType>(
  ({ block }) => {
    const children = useBlockChildren(block.id);

    if (children.length === 0) {
      return (
        <BlockDropzone
          parentId={block.id}
          type={block.type}
          icon={<Columns2Icon className="h-4 w-4" />}
        />
      );
    }

    return (
      <BlockList
        config={children}
        blocks={{
          text: TextBlock as React.FC<BaseBlockProps<Block>>,
          image: ImageBlock as React.FC<BaseBlockProps<Block>>,
          line: LineBlock as React.FC<BaseBlockProps<Block>>,
        }}
        className="h-full w-full flex-1 flex-col"
        parent={block}
        hideDropzone
      />
    );
  },
  null,
  ["left", "right"]
);
