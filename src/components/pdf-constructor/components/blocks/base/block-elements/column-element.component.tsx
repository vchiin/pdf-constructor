import { BlockList } from "../block-list.component";

import { BlockDropzone } from "../../../components/block-dropzone.component";
import { Columns2Icon } from "lucide-react";
import { ColumnBlock } from "@/components/pdf-constructor/shared/types/block.types";
import { useBlockChildren } from "@/components/pdf-constructor/contexts/constructor/pdf-constructor-context.hooks";
import { BlockElementProps } from "../shared/types/element.types";
import { Block } from "../block.component";
import { BlockTypeDefinitions } from "@/components/pdf-constructor/shared/constants/types-definition.constant";
import { ImageElement } from "./image-element.component";
import { TextElement } from "./text-element.component";
import { LineElement } from "./line-element.component";

export const ColumnElement: React.FC<BlockElementProps<ColumnBlock>> = ({
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
        <BlockList<typeof BlockTypeDefinitions.Column>
          config={children}
          blocks={{
            [BlockTypeDefinitions.Image]: ImageElement,
            [BlockTypeDefinitions.Text]: TextElement,
            [BlockTypeDefinitions.Line]: LineElement,
          }}
          className="h-full w-full flex-1 flex-col"
          parent={block}
          hideDropzone
        />
      )}
    </Block>
  );
};
