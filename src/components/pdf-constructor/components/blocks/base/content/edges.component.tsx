import { cn } from "@/shared/utils/cn.util";

import { Edge as EdgeType } from "@/components/pdf-constructor/features/constructor/services/interactions/interactions.types";
import { ElementType, memo, useState } from "react";
import { useDrop } from "@/components/pdf-constructor/features/dnd/hooks/use-drop.hook";
import { DropEdgePayload } from "@/components/pdf-constructor/features/dnd/types/payload.types";

export const EdgePosition: Record<Uppercase<EdgeType>, EdgeType> = {
  TOP: "top",
  BOTTOM: "bottom",
  LEFT: "left",
  RIGHT: "right",
} as const;

type EdgeProps = {
  data: Omit<DropEdgePayload, "areaType">;
  position: EdgeType;
  as?: ElementType;
};

const Edge = ({ data, position, as: Component = "div" }: EdgeProps) => {
  const [canBeDropped, setCanBeDropped] = useState(false);

  const [ref] = useDrop(
    {
      areaType: "edge",
      areaSubtype: data.areaSubtype,
      elementId: data.elementId,
      elementType: data.elementType,
      position: data.position,
    },
    {
      onDragEnter: () => {
        setCanBeDropped(true);
      },
      onDragLeave: () => {
        setCanBeDropped(false);
      },
      onDrop: () => {
        setCanBeDropped(false);
      },
    }
  );

  return (
    <Component
      ref={ref}
      className={cn(
        "opacity-0 transition-opacity",
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
        canBeDropped && "opacity-100"
      )}
    />
  );
};

export type EdgesProps = {
  data: Omit<DropEdgePayload, "areaType" | "position">;
  positions: EdgeType[];
  as?: ElementType;
};

export const Edges: React.FC<EdgesProps> = memo(({ data, positions, as }) => {
  return (
    <>
      {positions.map((position) => (
        <Edge
          key={position}
          data={{
            elementId: data.elementId,
            elementType: data.elementType,
            areaSubtype: data.areaSubtype,
            position,
          }}
          position={position}
          as={as}
        />
      ))}
    </>
  );
});
