import {
  TableRowBlock,
  TableCellBlock,
} from "@/components/pdf-constructor/shared/types/block.types";
import { Block } from "../../block.component";
import { useBlockChildren } from "@/components/pdf-constructor/contexts/constructor/pdf-constructor-context.hooks";
import { BlockDropzone } from "@/components/pdf-constructor/components/components/block-dropzone.component";
import { Columns2Icon } from "lucide-react";

import { TableCellElement } from "./table-cell-element.component";
import { BlockElementProps } from "../../shared/types/element.types";

import { WidthResizable } from "@/components/pdf-constructor/components/components/resizable/width-resizable.component";

import { calculateWidths } from "@/components/pdf-constructor/components/components/resizable/resizable.utils";
import { useChildrenWidth } from "@/components/pdf-constructor/hooks/use-children-width.hook";
import { usePreview } from "@/components/pdf-constructor/contexts/preview/pdf-preview.context";
import { memo } from "react";

const TableRowContent: React.FC<BlockElementProps<TableRowBlock>> = memo(
  ({ block }) => {
    const children = useBlockChildren(block.id);
    const [widths, setWidths] = useChildrenWidth(block.id, children.length);

    const { selectedBlockId } = usePreview();

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
      <>
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
            <TableCellElement block={child as TableCellBlock} />
          </WidthResizable>
        ))}
      </>
    );
  }
);

export const TableRowElement: React.FC<BlockElementProps<TableRowBlock>> = ({
  block,
}) => (
  <Block as="tr" block={block}>
    <TableRowContent block={block} />
  </Block>
);
