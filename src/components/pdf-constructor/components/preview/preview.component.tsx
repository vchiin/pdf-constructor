import { BlockList } from "../blocks/base/block-list.component";

import { ColumnGroupBlock } from "../blocks/base/blocks/column-group-block.component";
import { ImageBlock } from "../blocks/base/blocks/image-block.component";
import { LineBlock } from "../blocks/base/blocks/line-block.component";
import { TextBlock } from "../blocks/base/blocks/text-block.component";

import { useConstructor } from "../../contexts/constructor/pdf-constructor.context";
import {
  useBlock,
  useBlockChildren,
} from "../../contexts/constructor/pdf-constructor-context.hooks";
import { Block } from "../../contexts/constructor/constructor.types";
import { BaseBlockProps } from "../blocks/base/shared/types/block.type";
import { PAGE_WIDTH_PT } from "@/libs/pdfmake";
import { convertPtToPx } from "@/shared/utils/units.utils";
import { BreakBlock } from "../blocks/base/blocks/break-block.component";

import { BlockTypeDefinitions } from "../../shared/constants/types-definition.constant";
import { TableBlock } from "../blocks/base/blocks/table/table-block.component";
import { useEffect } from "react";

export const Preview = () => {
  const { rootId, containerRef, scale, setScale } = useConstructor();
  const children = useBlockChildren(rootId);
  const block = useBlock(rootId);

  useEffect(() => {
    const parentWidth = containerRef.current?.parentElement?.clientWidth;

    if (parentWidth) {
      setScale(parentWidth / convertPtToPx(PAGE_WIDTH_PT));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="rounded border p-4 shadow"
      style={{
        width: `${convertPtToPx(PAGE_WIDTH_PT) * scale}px`,
      }}
    >
      <BlockList
        config={children}
        blocks={{
          [BlockTypeDefinitions.Text]: TextBlock as React.FC<
            BaseBlockProps<Block>
          >,
          [BlockTypeDefinitions.Line]: LineBlock as React.FC<
            BaseBlockProps<Block>
          >,
          [BlockTypeDefinitions.Image]: ImageBlock as React.FC<
            BaseBlockProps<Block>
          >,
          [BlockTypeDefinitions.ColumnGroup]: ColumnGroupBlock as React.FC<
            BaseBlockProps<Block>
          >,
          [BlockTypeDefinitions.Break]: BreakBlock as React.FC<
            BaseBlockProps<Block>
          >,
          [BlockTypeDefinitions.Table]: TableBlock as React.FC<
            BaseBlockProps<Block>
          >,
        }}
        parent={block}
      />
    </div>
  );
};
