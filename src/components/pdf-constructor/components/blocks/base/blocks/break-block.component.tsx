import { withBlock } from "../block.component";
import { BreakBlock as BreakBlockType } from "@/components/pdf-constructor/contexts/constructor/constructor.types";

export const BreakBlock = withBlock<BreakBlockType>(() => {
  return (
    <div className="text-muted-foreground flex w-full items-center gap-1 text-center">
      <div className="bg-muted-foreground h-1 w-full rounded" />
      <span className="min-w-fit text-sm text-pretty">Page Break</span>
      <div className="bg-muted-foreground h-1 w-full rounded" />
    </div>
  );
});
