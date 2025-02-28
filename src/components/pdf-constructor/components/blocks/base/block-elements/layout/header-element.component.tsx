import {
  HeaderBlock,
  RootBlock,
} from "@/components/pdf-constructor/features/core/types/block.types";
import { BlockElementProps } from "../../shared/types/element.types";
import { Element } from "../../element.component";
import { ElementList } from "../../element-list.component";
import { BlockTypeDefinitions } from "@/components/pdf-constructor/features/core/constants/types-definition.constant";
import {
  useBlock,
  useBlockChildren,
} from "@/components/pdf-constructor/features/constructor/contexts/constructor/pdf-constructor-context.hooks";

import { TextElement } from "../text-element.component";
import { ImageElement } from "../image-element.component";
import { LineElement } from "../line-element.component";
import { useConstructor } from "@/components/pdf-constructor/features/constructor/contexts/constructor/pdf-constructor.context";
import { ColumnGroupElement } from "../column-group-element.component";
import { convertPtToPx } from "@/shared/utils/units.utils";
import { PAGE_WIDTH_PT } from "@/libs/pdfmake";

export const HeaderElement: React.FC<BlockElementProps<HeaderBlock>> = ({
  block,
}) => {
  const { rootId, showPreview } = useConstructor();
  const root = useBlock(rootId) as RootBlock;

  const children = useBlockChildren(block.id);

  return (
    <Element
      block={block}
      positions={["bottom"]}
      style={{
        width: `${convertPtToPx(PAGE_WIDTH_PT)}px`,
        margin: "0 auto",
        // pdfmake footer height === page margin top
        maxHeight: showPreview ? `${root.marginTop}px` : undefined,
      }}
      className="overflow-hidden"
      draggable={false}
      deletable={false}
    >
      <ElementList<typeof BlockTypeDefinitions.Header>
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
    </Element>
  );
};
