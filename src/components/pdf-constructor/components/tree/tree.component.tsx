import { cn } from "@/shared/utils/cn.util";
import { useBlockChildren } from "../../contexts/constructor/pdf-constructor-context.hooks";
import { useConstructor } from "../../contexts/constructor/pdf-constructor.context";
import { TreeList } from "./tree-list.component";
import { useRef } from "react";
import { ScrollerProvider } from "../../contexts/scroller/scroller.context";

type TreeProps = {
  className?: string;
};

export const Tree: React.FC<TreeProps> = ({ className }) => {
  const { rootId } = useConstructor();
  const children = useBlockChildren(rootId);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className={cn("flex flex-col", className)} ref={ref}>
      <ScrollerProvider containerRef={ref}>
        {children.map((child) => (
          <TreeList key={child.id} block={child} />
        ))}
      </ScrollerProvider>
    </div>
  );
};
