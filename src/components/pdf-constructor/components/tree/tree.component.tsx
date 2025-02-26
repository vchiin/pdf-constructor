import { cn } from "@/shared/utils/cn.util";
import { useBlock } from "../../contexts/constructor/pdf-constructor-context.hooks";
import { useConstructor } from "../../contexts/constructor/pdf-constructor.context";
import { TreeList } from "./tree-list.component";
import { useRef } from "react";
import { ScrollerProvider } from "../../contexts/scroller/scroller.context";
import { RootBlock } from "../../shared/types/block.types";

type TreeProps = {
  className?: string;
};

export const Tree: React.FC<TreeProps> = ({ className }) => {
  const { rootId } = useConstructor();
  const block = useBlock(rootId) as RootBlock;
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className={cn("flex flex-col", className)} ref={ref}>
      <ScrollerProvider containerRef={ref}>
        <TreeList block={block} />
      </ScrollerProvider>
    </div>
  );
};
