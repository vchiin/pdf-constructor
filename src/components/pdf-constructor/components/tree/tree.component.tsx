import { cn } from "@/shared/utils/cn.util";
import { useBlock } from "@/components/pdf-constructor/features/constructor/contexts/constructor/pdf-constructor-context.hooks";
import { useConstructor } from "@/components/pdf-constructor/features/constructor/contexts/constructor/pdf-constructor.context";
import { TreeList } from "./tree-list.component";
import { useRef } from "react";
import { ScrollerProvider } from "@/components/pdf-constructor/features/constructor/contexts/scroller/scroller.context";
import { RootBlock } from "../../features/core/types/block.types";

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
