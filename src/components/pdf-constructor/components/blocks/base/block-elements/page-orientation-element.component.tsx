import { BlockList } from "../block-list.component";

import { BlockDropzone } from "../../../components/block-dropzone.component";
import { PageOrientationBlock } from "@/components/pdf-constructor/shared/types/block.types";
import { useBlockChildren } from "@/components/pdf-constructor/contexts/constructor/pdf-constructor-context.hooks";
import { BlockElementProps } from "../shared/types/element.types";
import { Block } from "../block.component";
import { convertPtToPx } from "@/shared/utils/units.utils";
import { PAGE_HEIGHT_PT } from "@/libs/pdfmake";
import { useConstructor } from "@/components/pdf-constructor/contexts/constructor/pdf-constructor.context";

import { CSSProperties, memo } from "react";
import { PageOrientationBlockToolbar } from "../toolbars/page-orientation-toolbar.component";

import { BreakElement } from "./break-element.component";
import { BlockTypeDefinitions } from "@/components/pdf-constructor/shared/constants/types-definition.constant";
import { ColumnGroupElement } from "./column-group-element.component";
import { ImageElement } from "./image-element.component";
import { LineElement } from "./line-element.component";
import { TableElement } from "./table/table-element.component";

import { TextElement } from "./text-element.component";

const PageOrientationContent: React.FC<
  BlockElementProps<PageOrientationBlock>
> = memo(({ block }) => {
  const { showPreview } = useConstructor();
  const children = useBlockChildren(block.id);

  return (
    <>
      <BlockList<typeof BlockTypeDefinitions.PageOrientation>
        config={children}
        blocks={{
          [BlockTypeDefinitions.Break]: BreakElement,
          [BlockTypeDefinitions.ColumnGroup]: ColumnGroupElement,
          [BlockTypeDefinitions.Image]: ImageElement,
          [BlockTypeDefinitions.Line]: LineElement,
          [BlockTypeDefinitions.Table]: TableElement,
          [BlockTypeDefinitions.Text]: TextElement,
        }}
        className="h-full w-full flex-1 flex-col"
        parent={block}
        hideDropzone
      />
      {!showPreview && <BlockDropzone parentId={block.id} type={block.type} />}
    </>
  );
});

export const PageOrientationElement: React.FC<
  BlockElementProps<PageOrientationBlock>
> = ({ block }) => {
  const { scale } = useConstructor();
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
      <PageOrientationContent block={block} />
    </Block>
  );
};
