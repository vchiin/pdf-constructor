import { GeneralBlockType } from "../../shared/constants/types-definition.constant";
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
} from "./interactions.types";

export const interactions: Interactions = {
  root: {
    forbids: ["column", "table-row", "table-cell"],
  },
  column: {
    forbids: [
      "column",
      "column-group",
      "table",
      "table-row",
      "table-cell",
      "template",
      "break",
    ],
  },
  "column-group": {
    accepts: ["column", "template"],
  },
  table: {
    accepts: ["table-row", "template"],
  },
  "table-row": {
    accepts: ["table-cell", "template"],
  },
  "table-cell": {
    forbids: [
      "column",
      "column-group",
      "table",
      "table-row",
      "table-cell",
      "template",
      "break",
    ],
  },
};

export const canBeChildOf = (
  childType: GeneralBlockType,
  parentType: GeneralBlockType
) => {
  const accepts = interactions[parentType]?.accepts;
  const forbids = interactions[parentType]?.forbids;

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

export const getEdgeId = <Id extends BlockId, Position extends Edge>(
  id: Id,
  position: Position
): EdgeId<Id, Position> => `${id}_edge_${position}`;

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

export const getThumbnailId = <Id extends GeneralBlockType>(
  id: Id
): DragThumbnailId<Id> => `${id}_thumbnail`;

export const getTemplateId = (id: string): DragTemplateId => `${id}_template`;

export const isThumbnail = (type: DragTargetType): type is "thumbnail" => {
  return type === "thumbnail";
};

export const isTemplate = (
  type: DragTargetType
): type is Extract<DragTargetType, "template"> => {
  return type === "template";
};
