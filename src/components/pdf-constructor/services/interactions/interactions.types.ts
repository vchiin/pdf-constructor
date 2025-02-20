import { BlockType } from "../../shared/constants/types-definition.constant";
import { BlockId } from "../../shared/types/utils.types";

export type Interaction = {
  accepts?: BlockType[];
  forbids?: BlockType[];
};

export type Interactions = Partial<Record<BlockType, Interaction>>;

export type DragTargetType = "block" | "thumbnail";
export type DropAreaType = "edge" | "placeholder";

export type AreaId<
  Id extends BlockId | BlockType,
  T extends DropAreaType | DragTargetType,
> = `${Id}_${T}`;

export type DragBlockId<Id extends BlockId> = AreaId<Id, "block">;
export type DragThumbnailId<Id extends BlockType> = AreaId<Id, "thumbnail">;

export type DragTargetId = DragBlockId<BlockId> | DragThumbnailId<BlockType>;

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
