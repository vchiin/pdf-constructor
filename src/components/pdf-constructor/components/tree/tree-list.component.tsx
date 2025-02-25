import { cn } from "@/shared/utils/cn.util";
import { Block } from "../../shared/types/block.types";
import {
  useBlockChildren,
  useHasChild,
} from "../../contexts/constructor/pdf-constructor-context.hooks";
import { isContainerBlock } from "../../contexts/constructor/pdf-constructor-context.utils";
import { TreeBlock } from "./tree-block.component";
import { useEffect, useState } from "react";

import { usePreview } from "../../contexts/preview/pdf-preview.context";

type TreeListProps = {
  block: Block;
  className?: string;
};

export const TreeList = ({ block, className }: TreeListProps) => {
  const children = useBlockChildren(block.id);
  const { selectedBlockId } = usePreview();
  const hasChild = useHasChild(block.id, selectedBlockId);
  const [isCollapsed, setIsCollapsed] = useState(!hasChild);

  useEffect(() => {
    if (hasChild) {
      setIsCollapsed(false);
    }
  }, [hasChild]);

  if (!isContainerBlock(block)) {
    return <TreeBlock block={block} />;
  }

  return (
    <div className={cn("flex flex-col", className)}>
      <TreeBlock
        block={block}
        isCollapsed={isCollapsed}
        onCollapseChange={setIsCollapsed}
      />

      {!isCollapsed && (
        <div className="pl-2">
          {children.map((child) => (
            <TreeList key={child.id} block={child} />
          ))}
        </div>
      )}
    </div>
  );
};
