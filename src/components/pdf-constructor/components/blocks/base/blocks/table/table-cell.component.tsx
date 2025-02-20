import {
  Block as BlockType,
  TableCellBlock as TableCellBlockType,
} from "@/components/pdf-constructor/contexts/constructor/constructor.types";
import { Block } from "../../block.component";
import { BlockList } from "../../block-list.component";
import { useBlockChildren } from "@/components/pdf-constructor/contexts/constructor/pdf-constructor-context.hooks";
import { TextBlock } from "../text-block.component";
import { BaseBlockProps, BlockProps } from "../../shared/types/block.type";
import { ImageBlock } from "../image-block.component";
import { LineBlock } from "../line-block.component";
import { BlockTypeDefinitions } from "@/components/pdf-constructor/shared/constants/types-definition.constant";
import { useConstructor } from "@/components/pdf-constructor/contexts/constructor/pdf-constructor.context";
import { useMemo } from "react";
import { findParentBlock } from "@/components/pdf-constructor/contexts/constructor/pdf-constructor-context.utils";

export const TableCellBlock: React.FC<BlockProps<TableCellBlockType>> = ({
  block,
}) => {
  const { map } = useConstructor();
  const children = useBlockChildren(block.id);
  const { showPreview } = useConstructor();

  const tableParent = useMemo(() => {
    if (block.parentId) {
      const table = findParentBlock(block.parentId, map);

      if (!table || table.type !== BlockTypeDefinitions.Table) {
        return null;
      }

      return table;
    }

    return null;
  }, [block.parentId, map]);

  if (!tableParent) {
    return null;
  }

  return (
    <Block block={block} positions={["left", "right"]}>
      <div
        style={{
          paddingLeft: tableParent.paddingLeft,
          paddingRight: tableParent.paddingRight,
          paddingTop: tableParent.paddingTop,
          paddingBottom: tableParent.paddingBottom,
        }}
      >
        <BlockList
          config={children}
          blocks={{
            [BlockTypeDefinitions.Text]: TextBlock as React.FC<
              BaseBlockProps<BlockType>
            >,
            [BlockTypeDefinitions.Image]: ImageBlock as React.FC<
              BaseBlockProps<BlockType>
            >,
            [BlockTypeDefinitions.Line]: LineBlock as React.FC<
              BaseBlockProps<BlockType>
            >,
          }}
          parent={block}
          hideDropzone={showPreview}
        />
      </div>
    </Block>
  );
};
