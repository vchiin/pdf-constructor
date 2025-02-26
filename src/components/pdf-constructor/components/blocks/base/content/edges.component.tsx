import { cn } from "@/shared/utils/cn.util";

import { DropPayload } from "../shared/types/element.types";
import {
  Edge as EdgeType,
  SortableTargetType,
} from "@/components/pdf-constructor/services/interactions/interactions.types";
import { getEdgeId } from "@/components/pdf-constructor/services/interactions/interactions.service";
import { useDroppable } from "@/components/pdf-constructor/hooks/use-dnd.hook";
import { ElementType, memo } from "react";

export const EdgePosition: Record<Uppercase<EdgeType>, EdgeType> = {
  TOP: "top",
  BOTTOM: "bottom",
  LEFT: "left",
  RIGHT: "right",
} as const;

type EdgeProps = {
  data: DropPayload;
  position: EdgeType;
  type: SortableTargetType;
  as?: ElementType;
  isParentDragged: boolean;
};

const Edge = ({
  data,
  position,
  as: Component = "div",
  type,
  isParentDragged,
}: EdgeProps) => {
  const { setNodeRef, isOver, active, over } = useDroppable({
    id: getEdgeId(data.id, position, type),
    data: data,
    disabled: isParentDragged,
  });

  const isSameElement =
    over !== null &&
    active !== null &&
    over?.data.current?.id === active?.data.current?.id;

  const shouldBeReachable = active !== null && !isSameElement;
  const shouldBeVisible = isOver;

  return (
    <Component
      ref={setNodeRef}
      className={cn(
        "hidden opacity-0 transition-opacity",
        {
          "absolute top-0 left-0 h-4 max-h-1/2 w-full bg-red-500":
            position === EdgePosition.TOP,
          "absolute bottom-0 left-0 h-4 max-h-1/2 w-full bg-red-500":
            position === EdgePosition.BOTTOM,
          "absolute top-0 right-0 h-full w-4 max-w-1/2 bg-red-500":
            position === EdgePosition.RIGHT,
          "absolute top-0 left-0 h-full w-4 max-w-1/2 bg-red-500":
            position === EdgePosition.LEFT,
        },
        shouldBeReachable && "block",
        shouldBeVisible && "opacity-100"
      )}
    />
  );
};

export type EdgesProps = {
  data: DropPayload;
  positions: EdgeType[];
  type: SortableTargetType;
  as?: ElementType;
  isParentDragged: boolean;
};

export const Edges: React.FC<EdgesProps> = memo(
  ({ data, positions, as, type, isParentDragged }) => {
    return (
      <>
        {positions.map((position) => (
          <Edge
            key={position}
            data={data}
            position={position}
            type={type}
            as={as}
            isParentDragged={isParentDragged}
          />
        ))}
      </>
    );
  }
);
