import { BreakBlock } from "@/components/pdf-constructor/shared/types/block.types";
import { Block } from "../block.component";
import { BlockElementProps } from "../shared/types/element.types";

export const BreakElement: React.FC<BlockElementProps<BreakBlock>> = ({
  block,
}) => {
  return (
    <Block block={block}>
      <div className="text-muted-foreground flex w-full items-center gap-1 text-center">
        <div className="bg-muted-foreground h-1 w-full rounded" />
        <span className="min-w-fit text-sm text-pretty">Page Break</span>
        <div className="bg-muted-foreground h-1 w-full rounded" />
      </div>
    </Block>
  );
};
