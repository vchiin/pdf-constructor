import { Element } from "../../element.component";
import { TableBlock } from "@/components/pdf-constructor/features/core/types/block.types";

import { useBlockChildren } from "@/components/pdf-constructor/features/constructor/contexts/constructor/pdf-constructor-context.hooks";

import { BlockTypeDefinitions } from "@/components/pdf-constructor/features/core/constants/types-definition.constant";
import { TableRowElement } from "./table-row-element.component";
import { BlockElementProps } from "../../shared/types/element.types";
import { TableBlockToolbar } from "../../toolbars/table-block-toolbar.component";
import { memo } from "react";

const TableContent: React.FC<BlockElementProps<TableBlock>> = memo(
  ({ block }) => {
    const children = useBlockChildren(block.id);

    return (
      <table className="w-full table-fixed border-collapse">
        <tbody>
          {children.map((child) => {
            if (child.type !== BlockTypeDefinitions.TableRow) {
              return null;
            }

            return <TableRowElement key={child.id} block={child} />;
          })}
        </tbody>
      </table>
    );
  }
);

export const TableElement: React.FC<BlockElementProps<TableBlock>> = ({
  block,
}) => (
  <Element block={block} toolbar={<TableBlockToolbar block={block} />}>
    <TableContent block={block} />
  </Element>
);
