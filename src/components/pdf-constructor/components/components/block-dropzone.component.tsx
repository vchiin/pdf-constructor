import { cn } from "@/shared/utils/cn.util";
import { Active } from "@dnd-kit/core";

import { LandPlotIcon } from "lucide-react";

import {
  canBeChildOf,
  getPlaceholderId,
} from "../../services/interactions/interactions.service";
import { useDroppable } from "../../hooks/use-dnd.hook";
import { GeneralBlockType } from "../../shared/constants/types-definition.constant";
import { BlockId } from "../../shared/types/utils.types";

type BlockDropzoneProps = {
  type: GeneralBlockType;
  parentId: BlockId;

  className?: string;
  icon?: React.ReactNode;
  hidden?: boolean;
};

const isDroppable = (active: Active | null, parentType: GeneralBlockType) => {
  if (!active) return false;

  const activeType = active.data.current?.type as GeneralBlockType;

  if (!activeType) return false;

  return canBeChildOf(activeType, parentType);
};

export const BlockDropzone: React.FC<BlockDropzoneProps> = ({
  parentId,
  type,
  className,
  icon,
}) => {
  const { setNodeRef, isOver, active } = useDroppable({
    id: getPlaceholderId(parentId),
    data: {
      id: parentId,
      type,
    },
  });

  const canBeDropped = isDroppable(active, type);

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex flex-1 items-center justify-center border border-gray-100 bg-gray-50 p-4 transition-colors",
        isOver && canBeDropped && "bg-green-100",
        isOver && !canBeDropped && "bg-red-100",
        className
      )}
    >
      {icon ?? <LandPlotIcon className="h-4 w-4" />}
    </div>
  );
};
