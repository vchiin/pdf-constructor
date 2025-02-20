import { Block } from "../../block.component";
import { TableBlock as TableBlockType } from "@/components/pdf-constructor/contexts/constructor/constructor.types";

import { useBlockChildren } from "@/components/pdf-constructor/contexts/constructor/pdf-constructor-context.hooks";

import { BlockTypeDefinitions } from "@/components/pdf-constructor/shared/constants/types-definition.constant";
import { TableRowBlock } from "./table-row-block.component";
import { BlockProps } from "../../shared/types/block.type";
import { TableBlockToolbar } from "../../toolbars/table-block-toolbar.component";

export const TableBlock: React.FC<BlockProps<TableBlockType>> = ({ block }) => {
  const children = useBlockChildren(block.id);

  return (
    <Block block={block} toolbar={<TableBlockToolbar block={block} />}>
      <table className="w-full table-fixed border-collapse">
        <tbody>
          {children.map((child) => {
            if (child.type !== BlockTypeDefinitions.TableRow) {
              return null;
            }

            return <TableRowBlock key={child.id} block={child} />;
          })}
        </tbody>
      </table>
    </Block>
  );
};
