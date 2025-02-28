import { ElementList } from "../element-list.component";

import {
  PageOrientationBlock,
  RootBlock,
} from "@/components/pdf-constructor/features/core/types/block.types";
import {
  useBlock,
  useBlockChildren,
} from "@/components/pdf-constructor/features/constructor/contexts/constructor/pdf-constructor-context.hooks";
import { BlockElementProps } from "../shared/types/element.types";
import { Element } from "../element.component";
import { convertPtToPx } from "@/shared/utils/units.utils";
import { PAGE_HEIGHT_PT, PAGE_WIDTH_PT } from "@/libs/pdfmake";
import { useConstructor } from "@/components/pdf-constructor/features/constructor/contexts/constructor/pdf-constructor.context";

import { CSSProperties, memo, useEffect } from "react";
import { PageOrientationBlockToolbar } from "../toolbars/page-orientation-toolbar.component";

import { BlockTypeDefinitions } from "@/components/pdf-constructor/features/core/constants/types-definition.constant";
import { ColumnGroupElement } from "./column-group-element.component";
import { ImageElement } from "./image-element.component";
import { LineElement } from "./line-element.component";
import { TableElement } from "./table/table-element.component";

import { TextElement } from "./text-element.component";
import { findBlock } from "@/components/pdf-constructor/features/core/utils/operation.utils";

const PageOrientationContent: React.FC<
  BlockElementProps<PageOrientationBlock>
> = memo(({ block }) => {
  const { showPreview } = useConstructor();
  const children = useBlockChildren(block.id);

  return (
    <>
      <ElementList<typeof BlockTypeDefinitions.PageOrientation>
        config={children}
        blocks={{
          [BlockTypeDefinitions.ColumnGroup]: ColumnGroupElement,
          [BlockTypeDefinitions.Image]: ImageElement,
          [BlockTypeDefinitions.Line]: LineElement,
          [BlockTypeDefinitions.Table]: TableElement,
          [BlockTypeDefinitions.Text]: TextElement,
        }}
        className="h-full w-full flex-1 flex-col"
        parent={block}
        hideDropzone={showPreview}
      />
    </>
  );
});

export const PageOrientationElement: React.FC<
  BlockElementProps<PageOrientationBlock>
> = ({ block }) => {
  const { rootId, map, update } = useConstructor();
  const root = useBlock(rootId) as RootBlock;

  useEffect(() => {
    const index = root.children
      .filter((childId) => {
        const child = findBlock(childId, map);
        if (!child) {
          return false;
        }

        return child.type === block.type;
      })
      .findIndex((id) => id === block.id);

    if (index === -1) {
      return;
    }

    if (index === 0) {
      update({
        ...root,
        orientation: block.orientation,
      });
      update({
        ...block,
        pageBreak: false,
      });
      return;
    }

    if (!block.pageBreak) {
      update({
        ...block,
        pageBreak: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [root.children, block.orientation]);

  const styles: CSSProperties =
    block.orientation === "landscape"
      ? {
          width: `${convertPtToPx(PAGE_HEIGHT_PT) - root.marginLeft - root.marginRight}px`,
          margin: "0 auto",
        }
      : {
          width: `${convertPtToPx(PAGE_WIDTH_PT) - root.marginLeft - root.marginRight}px`,
          margin: "0 auto",
        };

  return (
    <Element
      block={block}
      className="overflow-x-auto"
      style={styles}
      toolbar={<PageOrientationBlockToolbar block={block} />}
    >
      <PageOrientationContent block={block} />
    </Element>
  );
};
