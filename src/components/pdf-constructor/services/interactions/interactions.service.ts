import { BlockType } from "../../shared/constants/types-definition.constant";
import { BlockId } from "../../shared/types/utils.types";
import {
  DragTargetId,
  DragTargetType,
  DragThumbnailId,
  DropAreaId,
  DropAreaType,
  Edge,
  EdgeId,
  GetIdConfig,
  Interactions,
  PlaceholderId,
} from "./interactions.types";

export const interactions: Interactions = {
  root: {
    forbids: ["column", "table-row", "table-cell"],
  },
  column: {
    forbids: ["column", "column-group", "table", "table-row", "table-cell"],
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
    forbids: ["column", "column-group", "table", "table-row", "table-cell"],
  },
};

export const canBeChildOf = (childType: BlockType, parentType: BlockType) => {
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

// overloads function getId for better type inference
export function getId(
  id: BlockId,
  config: GetIdConfig<DropAreaType>
): DropAreaId;
export function getId(
  id: BlockId,
  config: GetIdConfig<Exclude<DragTargetType, "thumbnail">>
): DragTargetId;
export function getId(
  id: BlockId,
  config: GetIdConfig<DropAreaType | Exclude<DragTargetType, "thumbnail">>
): DropAreaId | DragTargetId {
  const { type } = config;

  if (type === "edge") {
    const { position } = config;
    return `${id}_edge_${position}`;
  }

  return `${id}_${type}`;
}

export const getThumbnailId = <Id extends BlockType>(
  id: Id
): DragThumbnailId<Id> => `${id}_thumbnail`;

export const isThumbnail = (type: DragTargetType): type is "thumbnail" => {
  return type === "thumbnail";
};
