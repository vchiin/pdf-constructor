import { TableCellBlock } from "@/components/pdf-constructor/features/core/types/block.types";
import { Element } from "../../element.component";
import { ElementList } from "../../element-list.component";
import { useBlockChildren } from "@/components/pdf-constructor/features/constructor/contexts/constructor/pdf-constructor-context.hooks";
import { BlockElementProps } from "../../shared/types/element.types";
import { BlockTypeDefinitions } from "@/components/pdf-constructor/features/core/constants/types-definition.constant";
import { useConstructor } from "@/components/pdf-constructor/features/constructor/contexts/constructor/pdf-constructor.context";
import { memo, useMemo } from "react";

import { ImageElement } from "../image-element.component";
import { LineElement } from "../line-element.component";
import { TextElement } from "../text-element.component";
import { Edge } from "@/components/pdf-constructor/features/constructor/services/interactions/interactions.types";
import { findParentBlock } from "@/components/pdf-constructor/features/core/utils/operation.utils";

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
        <ElementList<typeof BlockTypeDefinitions.TableCell>
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
  <Element block={block} positions={positions}>
    <TableCellContent block={block} />
  </Element>
);
