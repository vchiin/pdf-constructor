import { cn } from "@/shared/utils/cn.util";

import { BaseTemplateThumbnailProps } from "./shared/types/template-thumbnail.types";

import { CSSProperties } from "react";
import { useDrag } from "@/components/pdf-constructor/features/dnd/hooks/use-drag.hook";

type TemplateThumbnailProps = BaseTemplateThumbnailProps & {
  title: string;
};

export const TemplateThumbnail: React.FC<TemplateThumbnailProps> = ({
  id,
  title,
}) => {
  const [ref, { dragging }] = useDrag<HTMLDivElement>({
    targetType: "template",
    elementType: "template",
    id,
    title,
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
        <span className="text-center text-sm font-bold uppercase italic">
          {title}
        </span>
      </div>
    </div>
  );
};
