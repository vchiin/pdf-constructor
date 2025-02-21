import { GeneralBlockType } from "../../shared/constants/types-definition.constant";
import { BlockId } from "../../shared/types/utils.types";

export type Interaction = {
  accepts?: GeneralBlockType[];
  forbids?: GeneralBlockType[];
};

export type Interactions = Partial<Record<GeneralBlockType, Interaction>>;

export type DragTargetType = "block" | "thumbnail" | "template";
export type DropAreaType = "edge" | "placeholder";

export type AreaId<
  Id extends BlockId | GeneralBlockType | string,
  T extends DropAreaType | DragTargetType,
> = `${Id}_${T}`;

export type DragBlockId<Id extends BlockId> = AreaId<Id, "block">;
export type DragThumbnailId<Id extends GeneralBlockType> = AreaId<
  Id,
  "thumbnail"
>;
export type DragTemplateId = AreaId<string, "template">;

export type DragTargetId =
  | DragBlockId<BlockId>
  | DragThumbnailId<GeneralBlockType>
  | DragTemplateId;

export type Edge = "top" | "bottom" | "left" | "right";

export type EdgeId<
  Id extends BlockId,
  Position extends Edge,
> = `${AreaId<Id, "edge">}_${Position}`;

export type PlaceholderId<Id extends BlockId> = `${AreaId<Id, "placeholder">}`;

export type DropAreaId = EdgeId<BlockId, Edge> | PlaceholderId<BlockId>;

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
