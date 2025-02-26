import {
  BlockType,
  GenericBlockType,
} from "../../shared/constants/types-definition.constant";
import { BlockId } from "../../shared/types/utils.types";
import {
  DragTargetType,
  DragThumbnailId,
  DragTemplateId,
  DropAreaId,
  DropAreaType,
  Edge,
  EdgeId,
  GetId,
  GetIdConfig,
  Interactions,
  PlaceholderId,
  SortableTargetType,
  Interaction,
} from "./interactions.types";

export const interactions = {
  root: {
    forbids: ["column", "table-row", "table-cell", "root"],
  },
  "page-orientation": {
    forbids: [
      "column",
      "table-row",
      "table-cell",
      "root",
      "page-orientation",
      "header",
      "footer",
    ],
  },
  header: {
    accepts: ["text", "image", "line", "column-group"],
  },
  footer: {
    accepts: ["text", "image", "line", "column-group"],
  },
  column: {
    accepts: ["text", "image", "line"],
  },
  "column-group": {
    accepts: ["column"],
  },
  table: {
    accepts: ["table-row"],
  },
  "table-row": {
    accepts: ["table-cell"],
  },
  "table-cell": {
    accepts: ["text", "image", "line"],
  },
} as const satisfies Interactions;

export const staticElements = [
  "root",
  "header",
  "footer",
] as const satisfies BlockType[];

export const canBeChildOf = (
  childType: GenericBlockType,
  parentType: GenericBlockType
) => {
  const parentType_ = parentType as keyof typeof interactions;
  const parentInteractions = interactions[parentType_] as Interaction;

  if (!parentInteractions) {
    return;
  }
  const accepts = parentInteractions?.accepts;
  const forbids = parentInteractions?.forbids;

  if (accepts && forbids) {
    return accepts.includes(childType) && !forbids.includes(childType);
  }

  if (accepts) {
    return accepts.includes(childType);
  }

  if (forbids) {
    return !forbids.includes(childType);
  }

  return false;
};

export const getEdgeId = <
  Id extends BlockId,
  Position extends Edge,
  Type extends SortableTargetType,
>(
  id: Id,
  position: Position,
  type: Type
): EdgeId<Id, Position, Type> => `${id}_edge_${position}_${type}`;

export const getPlaceholderId = <Id extends BlockId>(
  id: Id
): PlaceholderId<Id> => `${id}_placeholder`;

export const getDropAreaType = (
  id: DropAreaId
):
  | [Exclude<DropAreaType, "edge">, undefined]
  | [Extract<DropAreaType, "edge">, Edge] => {
  const [_, type, position] = id.split("_");

  if (type === "edge") {
    return ["edge", position as Edge];
  }

  return ["placeholder", undefined];
};

export const getId = <T extends DropAreaType | DragTargetType>(
  id: BlockId,
  config: GetIdConfig<T>
): GetId<T> => {
  const { type } = config;

  if (type === "edge") {
    const { position } = config;
    return `${id}_edge_${position}` as GetId<T>;
  }

  return `${id}_${type}` as GetId<T>;
};

export const getThumbnailId = <Id extends GenericBlockType>(
  id: Id
): DragThumbnailId<Id> => `${id}_thumbnail`;

export const getTemplateId = (id: string): DragTemplateId => `${id}_template`;
