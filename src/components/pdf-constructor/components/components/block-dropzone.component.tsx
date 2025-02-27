import { cn } from "@/shared/utils/cn.util";

import { LandPlotIcon } from "lucide-react";

import { canBeChildOf } from "../../features/constructor/services/interactions/interactions.service";
import { BlockType } from "../../shared/constants/types-definition.constant";
import { BlockId } from "../../shared/types/utils.types";
import { useDrop } from "../../features/dnd/hooks/use-drop.hook";
import { useState } from "react";

type BlockDropzoneProps = {
  type: BlockType;
  parentId: BlockId;

  className?: string;
  icon?: React.ReactNode;
  hidden?: boolean;
};

type DropState = "idle" | "valid" | "invalid";

export const BlockDropzone: React.FC<BlockDropzoneProps> = ({
  parentId,
  type,
  className,
  icon,
}) => {
  const [canBeDropped, setCanBeDropped] = useState<DropState>("idle");

  const [ref] = useDrop<HTMLDivElement>(
    {
      areaType: "placeholder",
      elementId: parentId,
      elementType: type,
    },
    {
      onDragEnter: (data) => {
        if (canBeChildOf(data.elementType, type)) {
          setCanBeDropped("valid");
        } else {
          setCanBeDropped("invalid");
        }
      },
      onDragLeave: () => {
        setCanBeDropped("idle");
      },
      onDrop: () => {
        setCanBeDropped("idle");
      },
    }
  );

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-center border border-gray-100 bg-gray-50 p-4 transition-colors",
        canBeDropped === "valid" && "bg-green-100",
        canBeDropped === "invalid" && "bg-red-100",
        className
      )}
    >
      {icon ?? <LandPlotIcon className="h-4 w-4" />}
    </div>
  );
};
