import { Grid, ItemsProps } from "../../../components/resizable/grid.component";

import { useMemo } from "react";
import {
  ColumnBlock,
  ColumnGroupBlock,
} from "@/components/pdf-constructor/shared/types/block.types";
import { ColumnElement } from "./column-element.component";
import { useBlockChildren } from "@/components/pdf-constructor/features/constructor/contexts/constructor/pdf-constructor-context.hooks";
import { Block as BlockType } from "@/components/pdf-constructor/shared/types/block.types";
import { WidthResizable } from "../../../components/resizable/width-resizable.component";
import { useChildrenWidth } from "@/components/pdf-constructor/hooks/use-children-width.hook";
import { BlockElementProps } from "../shared/types/element.types";
import { Block } from "../block.component";
import { usePreview } from "@/components/pdf-constructor/features/constructor/contexts/preview/pdf-preview.context";

const withResizable = (block: BlockType) => {
  return (props: ItemsProps) => {
    const { selectedBlockId } = usePreview();
    const isActive = selectedBlockId === block.id;

    return (
      <WidthResizable {...props} hidden={props.hidden || !isActive}>
        <ColumnElement key={block.id} block={block as ColumnBlock} />
      </WidthResizable>
    );
  };
};

export const ColumnGroupElement: React.FC<
  BlockElementProps<ColumnGroupBlock>
> = ({ block }) => {
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
