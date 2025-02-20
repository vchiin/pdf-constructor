import { DropPayload } from "../../components/blocks/base/shared/types/block.type";
import { DragPayload } from "../../components/blocks/base/shared/types/block.type";
import { BlockId } from "../../shared/types/utils.types";

import { Block, BlockMap } from "./constructor.types";
import { Edge } from "../../services/interactions/interactions.types";

export type ConstructorState = {
  map: BlockMap;
  selectedBlockId: BlockId | null;
  rootId: BlockId;
  showPreview: boolean;
};

export type ConstructorContext = ConstructorState & {
  update: (block: Block) => void;
  selectBlock: (blockId: BlockId) => void;
  deselectBlock: () => void;
  deleteBlock: (blockId: BlockId) => void;
  updateChildrenWidths: (blockId: BlockId, widths: number[]) => void;
  togglePreview: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
};

export const InsertionPlace = {
  BEFORE: "before",
  AFTER: "after",
} as const;

export const ActionTypes = {
  SELECT_BLOCK: "select-block",
  DESELECT_BLOCK: "deselect-block",
  CREATE_BLOCK: "create-block",
  MOVE_BLOCK: "move-block",
  SWAP_BLOCK: "swap-block",
  UPDATE_BLOCK: "update-block",
  DELETE_BLOCK: "delete-block",
  UPDATE_CHILDREN_WIDTHS: "update-children-widths",
  TOGGLE_PREVIEW: "toggle-preview",
  FILL_TABLE_CELLS: "fill-table-cells",
} as const;

export type Action<
  Type extends (typeof ActionTypes)[keyof typeof ActionTypes],
  Payload,
> = {
  type: Type;
  payload: Payload;
};

type SelectBlockAction = Action<
  typeof ActionTypes.SELECT_BLOCK,
  { blockId: BlockId }
>;

type DeselectBlockAction = Action<typeof ActionTypes.DESELECT_BLOCK, undefined>;

type CreateBlockAction = Action<
  typeof ActionTypes.CREATE_BLOCK,
  {
    blocks: Block[];
    // nullable if placed onto a placeholder
    overId: Block["id"] | null;
    direction: (typeof InsertionPlace)[keyof typeof InsertionPlace] | null;
  }
>;

type UpdateBlockAction = Action<
  typeof ActionTypes.UPDATE_BLOCK,
  { block: Block }
>;

type DeleteBlockAction = Action<
  typeof ActionTypes.DELETE_BLOCK,
  { blockId: BlockId }
>;

type MoveBlockAction = Action<
  typeof ActionTypes.MOVE_BLOCK,
  {
    blockId: BlockId;
    targetId: BlockId | null;
    targetParentId: BlockId | null;
    direction: (typeof InsertionPlace)[keyof typeof InsertionPlace];
  }
>;

type UpdateChildrenWidthsAction = Action<
  typeof ActionTypes.UPDATE_CHILDREN_WIDTHS,
  { blockId: BlockId; widths: number[] }
>;

type TogglePreviewAction = Action<typeof ActionTypes.TOGGLE_PREVIEW, undefined>;

type FillTableCellsAction = Action<
  typeof ActionTypes.FILL_TABLE_CELLS,
  {
    cells: Block[];
    index: number;
    direction: (typeof InsertionPlace)[keyof typeof InsertionPlace];
  }
>;

type SwapBlockAction = Action<
  typeof ActionTypes.SWAP_BLOCK,
  {
    blockId: BlockId;
    targetId: BlockId;
  }
>;

export type ConstructorAction =
  | SelectBlockAction
  | DeselectBlockAction
  | CreateBlockAction
  | UpdateBlockAction
  | DeleteBlockAction
  | MoveBlockAction
  | UpdateChildrenWidthsAction
  | TogglePreviewAction
  | FillTableCellsAction
  | SwapBlockAction;

export type DropAreaCallback = (
  active: DragPayload,
  over: DropPayload,
  blocks: BlockMap,
  extra: Partial<{
    edge: Edge;
  }>
) => ConstructorAction[];

export type DragTargetCallback = (props: {
  active: Pick<Block, "id" | "type">;
  over: Pick<Block, "id" | "type"> | null;
  parentId: BlockId;
  direction: (typeof InsertionPlace)[keyof typeof InsertionPlace];
  blocks: BlockMap;
}) => ConstructorAction[];
