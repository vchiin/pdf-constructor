import {
  TableRowBlock as TableRowBlockType,
  TableCellBlock as TableCellBlockType,
} from "@/components/pdf-constructor/contexts/constructor/constructor.types";
import { Block } from "../../block.component";
import { useBlockChildren } from "@/components/pdf-constructor/contexts/constructor/pdf-constructor-context.hooks";
import { BlockDropzone } from "@/components/pdf-constructor/components/components/block-dropzone.component";
import { Columns2Icon } from "lucide-react";

import { TableCellBlock } from "./table-cell.component";
import { BlockProps } from "../../shared/types/block.type";

import { WidthResizable } from "@/components/pdf-constructor/components/components/resizable/width-resizable.component";

import { useConstructor } from "@/components/pdf-constructor/contexts/constructor/pdf-constructor.context";
import { calculateWidths } from "@/components/pdf-constructor/components/components/resizable/resizable.utils";
import { useChildrenWidth } from "@/components/pdf-constructor/hooks/use-children-width.hook";

export const TableRowBlock: React.FC<BlockProps<TableRowBlockType>> = ({
  block,
}) => {
  const children = useBlockChildren(block.id);
  const [widths, setWidths] = useChildrenWidth(block.id, children.length);

  const { selectedBlockId } = useConstructor();

  if (children.length === 0) {
    return (
      <BlockDropzone
        parentId={block.id}
        type={block.type}
        icon={<Columns2Icon className="h-4 w-4" />}
      />
    );
  }

  const handleResize = (
    id: number,
    delta: number,
    cb: (prev: number, delta: number) => number
  ) => {
    setWidths((prev) =>
      calculateWidths({
        previousWidths: prev,
        delta,
        id,
        itemsAmount: children.length,
        calculateCallback: cb,
      })
    );
  };

  return (
    <Block as="tr" block={block}>
      {children.map((child, index) => (
        <WidthResizable
          key={index}
          id={index}
          width={widths[index]}
          onResize={handleResize}
          hidden={selectedBlockId !== child.id}
          as="td"
          className="border border-gray-500"
        >
          <TableCellBlock block={child as TableCellBlockType} />
        </WidthResizable>
      ))}
    </Block>
  );
};
