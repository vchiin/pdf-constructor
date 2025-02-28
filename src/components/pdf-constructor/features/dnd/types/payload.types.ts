import {
  BlockType,
  CustomBlockTypeDefinitions,
  GenericBlockType,
} from "@/components/pdf-constructor/features/core/constants/types-definition.constant";
import {
  DragTargetType,
  DropAreaType,
  Edge,
  SortableTargetType,
} from "../../constructor/services/interactions/interactions.types";
import { BlockId } from "@/components/pdf-constructor/shared/types/utils.types";

type DragBasePayload<Type extends DragTargetType> = {
  targetType: Extract<DragTargetType, Type>;
  elementType: GenericBlockType;
};

type DragElementPayload = DragBasePayload<"block"> & {
  elementId: BlockId;
};

type DragThumbnailPayload = DragBasePayload<"thumbnail">;

type DragTemplatePayload = DragBasePayload<"template"> & {
  id: string;
  title: string;
  elementType: Extract<
    GenericBlockType,
    typeof CustomBlockTypeDefinitions.Template
  >;
};

type DragLeafPayload = DragBasePayload<"leaf"> & {
  elementId: BlockId;
};

export type DragPayload =
  | DragElementPayload
  | DragThumbnailPayload
  | DragTemplatePayload
  | DragLeafPayload;

export type DropPlaceholderPayload = {
  areaType: Extract<DropAreaType, "placeholder">;
  elementType: BlockType;
  elementId: BlockId;
};

export type DropEdgePayload = {
  areaType: Extract<DropAreaType, "edge">;
  areaSubtype: SortableTargetType;
  position: Edge;
  elementId: BlockId;
  elementType: BlockType;
};

export type DropPayload = DropPlaceholderPayload | DropEdgePayload;
