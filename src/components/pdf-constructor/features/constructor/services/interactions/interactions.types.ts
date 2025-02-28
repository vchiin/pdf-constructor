import { GenericBlockType } from "../../../core/constants/types-definition.constant";
import { BlockId } from "../../../core/types/utils.types";

export type Interaction = {
  accepts?: GenericBlockType[];
  forbids?: GenericBlockType[];
};

export type Interactions = Partial<Record<GenericBlockType, Interaction>>;

// TODO: Rename to avoid connection to DND
export type DragTargetType = "block" | "thumbnail" | "template" | "leaf";
export type DropAreaType = "edge" | "placeholder";

export type SortableTargetType = Extract<DragTargetType, "block" | "leaf">;

export type AreaId<
  Id extends BlockId | GenericBlockType | string,
  T extends DropAreaType | DragTargetType,
> = `${Id}_${T}`;

export type DragBlockId<Id extends BlockId> = AreaId<Id, "block">;
export type DragThumbnailId<Id extends GenericBlockType> = AreaId<
  Id,
  "thumbnail"
>;
export type DragTemplateId = AreaId<string, "template">;
export type DragTreeItemId<Id extends BlockId> = AreaId<Id, "leaf">;
export type DragTargetId =
  | DragBlockId<BlockId>
  | DragTreeItemId<BlockId>
  | DragThumbnailId<GenericBlockType>
  | DragTemplateId;

export type Edge = "top" | "bottom" | "left" | "right";

export type EdgeId<
  Id extends BlockId,
  Position extends Edge,
  Type extends SortableTargetType,
> = `${AreaId<Id, "edge">}_${Position}_${Type}`;

export type PlaceholderId<Id extends BlockId> = `${AreaId<Id, "placeholder">}`;

export type DropAreaId =
  | EdgeId<BlockId, Edge, SortableTargetType>
  | PlaceholderId<BlockId>;

export type GetIdConfig<Type extends DropAreaType | DragTargetType> =
  Type extends "edge"
    ? {
        type: Type;
        position: Edge;
      }
    : {
        type: Type;
      };

export type GetId<Type extends DropAreaType | DragTargetType> =
  Type extends DropAreaType ? DropAreaId : DragTargetId;
