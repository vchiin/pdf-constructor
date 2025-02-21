import { BreakBlock as BreakBlockType } from "@/components/pdf-constructor/contexts/constructor/constructor.types";
import { Block } from "../block.component";
import { BlockProps } from "../shared/types/block.type";

export const BreakBlock: React.FC<BlockProps<BreakBlockType>> = ({ block }) => {
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
