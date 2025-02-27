import { BaseBlockThumbnailProps } from "./shared/types/block-thumbnail.types";
import { cn } from "@/shared/utils/cn.util";

import { GenericBlockType } from "@/components/pdf-constructor/shared/constants/types-definition.constant";
import { CSSProperties } from "react";
import { useDrag } from "@/components/pdf-constructor/features/dnd/hooks/use-drag.hook";

type BlockThumbnailProps<T extends GenericBlockType> =
  BaseBlockThumbnailProps<T> & {
    title: string;
    icon: React.FC<{ className: string }>;
  };

export const BlockThumbnail = <T extends GenericBlockType>({
  type,
  title,
  icon: Icon,
}: BlockThumbnailProps<T>) => {
  const [ref, { dragging }] = useDrag<HTMLDivElement>({
    targetType: "thumbnail",
    elementType: type,
  });

  const style: CSSProperties = {
    opacity: dragging.type === "preview" ? 0.5 : 1,
  };

  return (
    <div
      className={cn(
        "flex min-h-28 min-w-28 cursor-grab flex-col items-center justify-center gap-2 rounded-md border border-gray-300 p-2"
      )}
      style={style}
      ref={ref}
    >
      <div className="text-muted-foreground flex flex-col items-center justify-center gap-2">
        <Icon className="h-8 w-8" />

        <span className="text-center text-sm font-bold uppercase italic">
          {title}
        </span>
      </div>
    </div>
  );
};
