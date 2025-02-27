import { DragOverlay, useDndContext } from "@dnd-kit/core";
import { createPortal } from "react-dom";

import { GenericThumbnail } from "@/components/pdf-constructor/components/blocks/thumbnails/generic-thumbnail.component";
import { BlockType } from "@/components/pdf-constructor/shared/constants/types-definition.constant";
import { DragPayload } from "@/components/pdf-constructor/components/blocks/base/shared/types/element.types";
import { TemplateThumbnail } from "@/components/pdf-constructor/components/blocks/templates/template-thumbnail.component";

export const DragPreview = () => {
  const { active } = useDndContext();

  if (!active) {
    return null;
  }

  const activePayload = active.data?.current as DragPayload;

  if (!activePayload) {
    return null;
  }

  return createPortal(
    <DragOverlay>
      {/* Blocks shouldn't be rendered in overlay, because they are dragged inside the preview container */}
      {activePayload.dragTargetType === "thumbnail" && (
        <GenericThumbnail type={activePayload.type as BlockType} />
      )}
      {activePayload.dragTargetType === "template" && (
        <TemplateThumbnail id={activePayload.id} title={activePayload.title} />
      )}
    </DragOverlay>,
    document.body
  );
};
