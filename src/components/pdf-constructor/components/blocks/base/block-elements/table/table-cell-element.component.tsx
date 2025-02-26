import { TableCellBlock } from "@/components/pdf-constructor/shared/types/block.types";
import { Block } from "../../block.component";
import { BlockList } from "../../block-list.component";
import { useBlockChildren } from "@/components/pdf-constructor/contexts/constructor/pdf-constructor-context.hooks";
import { BlockElementProps } from "../../shared/types/element.types";
import { BlockTypeDefinitions } from "@/components/pdf-constructor/shared/constants/types-definition.constant";
import { useConstructor } from "@/components/pdf-constructor/contexts/constructor/pdf-constructor.context";
import { memo, useMemo } from "react";
import { findParentBlock } from "@/components/pdf-constructor/contexts/constructor/pdf-constructor-context.utils";

import { ImageElement } from "../image-element.component";
import { LineElement } from "../line-element.component";
import { TextElement } from "../text-element.component";
import { Edge } from "@/components/pdf-constructor/services/interactions/interactions.types";

const TableCellContent: React.FC<BlockElementProps<TableCellBlock>> = memo(
  ({ block }) => {
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
      <div
        style={{
          paddingLeft: tableParent.paddingLeft,
          paddingRight: tableParent.paddingRight,
          paddingTop: tableParent.paddingTop,
          paddingBottom: tableParent.paddingBottom,
        }}
      >
        <BlockList<typeof BlockTypeDefinitions.TableCell>
          config={children}
          blocks={{
            image: ImageElement,
            line: LineElement,
            text: TextElement,
          }}
          parent={block}
          hideDropzone={showPreview}
        />
      </div>
    );
  }
);

const positions: Edge[] = ["left", "right"];

export const TableCellElement: React.FC<BlockElementProps<TableCellBlock>> = ({
  block,
}) => (
  <Block block={block} positions={positions}>
    <TableCellContent block={block} />
  </Block>
);
