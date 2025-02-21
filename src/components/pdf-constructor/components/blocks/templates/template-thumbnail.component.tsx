import { cn } from "@/shared/utils/cn.util";
import { useDraggable } from "@/components/pdf-constructor/hooks/use-dnd.hook";
import { getTemplateId } from "@/components/pdf-constructor/services/interactions/interactions.service";

import { BaseTemplateThumbnailProps } from "./shared/types/template-thumbnail.types";
import { CustomBlockTypeDefinitions } from "@/components/pdf-constructor/shared/constants/types-definition.constant";
import { CSSProperties } from "react";

type TemplateThumbnailProps = BaseTemplateThumbnailProps & {
  title: string;
};

export const TemplateThumbnail: React.FC<TemplateThumbnailProps> = ({
  id,
  title,
}) => {
  const { setNodeRef, listeners, isDragging, attributes } = useDraggable({
    id: getTemplateId(id),
    data: {
      id,
      type: CustomBlockTypeDefinitions.Template,
      dragTargetType: "template",
      title,
    },
  });

  const style: CSSProperties = {
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      className={cn(
        "flex min-h-28 min-w-28 cursor-grab flex-col items-center justify-center gap-2 rounded-md border border-gray-300 p-2"
      )}
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <div className="text-muted-foreground flex flex-col items-center justify-center gap-2">
        <span className="text-center text-sm font-bold uppercase italic">
          {title}
        </span>
      </div>
    </div>
  );
};
