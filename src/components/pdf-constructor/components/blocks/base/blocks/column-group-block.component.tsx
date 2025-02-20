import { Grid, ItemsProps } from "../../../components/resizable/grid.component";

import { useMemo } from "react";
import {
  ColumnBlock as ColumnBlockType,
  ColumnGroupBlock as ColumnGroupBlockType,
} from "@/components/pdf-constructor/contexts/constructor/constructor.types";
import { ColumnBlock } from "./column-block.component";
import { useBlockChildren } from "@/components/pdf-constructor/contexts/constructor/pdf-constructor-context.hooks";
import { Block as BlockType } from "@/components/pdf-constructor/contexts/constructor/constructor.types";
import { useConstructor } from "@/components/pdf-constructor/contexts/constructor/pdf-constructor.context";
import { WidthResizable } from "../../../components/resizable/width-resizable.component";
import { useChildrenWidth } from "@/components/pdf-constructor/hooks/use-children-width.hook";
import { BlockProps } from "../shared/types/block.type";
import { Block } from "../block.component";

const withResizable = (block: BlockType) => {
  return (props: ItemsProps) => {
    const { selectedBlockId } = useConstructor();
    const isActive = selectedBlockId === block.id;

    return (
      <WidthResizable {...props} hidden={props.hidden || !isActive}>
        <ColumnBlock key={block.id} block={block as ColumnBlockType} />
      </WidthResizable>
    );
  };
};

export const ColumnGroupBlock: React.FC<BlockProps<ColumnGroupBlockType>> = ({
  block,
}) => {
  const [widths, setWidths] = useChildrenWidth(block.id, block.children.length);
  const children = useBlockChildren(block.id);

  // Memoize the items array
  const items = useMemo(
    () =>
      block.children.map((_, index) => {
        const childBlock = children[index];
        return withResizable(childBlock);
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [block.children]
  );

  return (
    <Block block={block}>
      <Grid
        widths={widths}
        setWidths={setWidths}
        minWidth={10}
        items={items}
        gap={block.gap}
      />
    </Block>
  );
};
