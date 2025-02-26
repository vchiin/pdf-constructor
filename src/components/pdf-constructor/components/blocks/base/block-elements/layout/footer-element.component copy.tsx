import {
  FooterBlock,
  RootBlock,
} from "@/components/pdf-constructor/shared/types/block.types";
import { BlockElementProps } from "../../shared/types/element.types";
import { Block } from "../../block.component";
import { BlockList } from "../../block-list.component";
import { BlockTypeDefinitions } from "@/components/pdf-constructor/shared/constants/types-definition.constant";
import {
  useBlock,
  useBlockChildren,
} from "@/components/pdf-constructor/contexts/constructor/pdf-constructor-context.hooks";

import { TextElement } from "../text-element.component";
import { ImageElement } from "../image-element.component";
import { LineElement } from "../line-element.component";
import { useConstructor } from "@/components/pdf-constructor/contexts/constructor/pdf-constructor.context";
import { ColumnGroupElement } from "../column-group-element.component";

export const FooterElement: React.FC<BlockElementProps<FooterBlock>> = ({
  block,
}) => {
  const { rootId, showPreview, scale } = useConstructor();
  const root = useBlock(rootId) as RootBlock;

  const children = useBlockChildren(block.id);

  return (
    <Block
      block={block}
      positions={["top"]}
      style={{
        // pdfmake footer height === page margin top
        maxHeight: showPreview ? `${root.marginTop * scale}px` : undefined,
      }}
      className="overflow-hidden"
    >
      <BlockList<typeof BlockTypeDefinitions.Footer>
        parent={block}
        config={children}
        blocks={{
          [BlockTypeDefinitions.ColumnGroup]: ColumnGroupElement,
          [BlockTypeDefinitions.Text]: TextElement,
          [BlockTypeDefinitions.Image]: ImageElement,
          [BlockTypeDefinitions.Line]: LineElement,
        }}
        smallDropzone
        hideDropzone={showPreview}
      />
    </Block>
  );
};
