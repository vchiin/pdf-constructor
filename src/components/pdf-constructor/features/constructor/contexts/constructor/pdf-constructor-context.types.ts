import { BlockId } from "../../../../shared/types/utils.types";

import { Block, BlockMap } from "../../../../shared/types/block.types";
import {
  DragTargetType,
  DropAreaType,
} from "../../../../features/constructor/services/interactions/interactions.types";
import { DragPayload, DropPayload } from "../../../dnd/types/payload.types";

export type ConstructorState = {
  map: BlockMap;
  rootId: BlockId;
  showPreview: boolean;
  scale: number;
};

export type ConstructorContext = ConstructorState & {
  update: (block: Block) => void;
  deleteBlock: (blockId: BlockId) => void;
  updateChildrenWidths: (blockId: BlockId, widths: number[]) => void;
  togglePreview: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
  setScale: (value: number) => void;
};

export const InsertionPlace = {
  BEFORE: "before",
  AFTER: "after",
} as const;

export const ActionTypes = {
  CREATE_BLOCK: "create-block",
  MOVE_BLOCK: "move-block",
  SWAP_BLOCK: "swap-block",
  UPDATE_BLOCK: "update-block",
  DELETE_BLOCK: "delete-block",
  UPDATE_CHILDREN_WIDTHS: "update-children-widths",
  TOGGLE_PREVIEW: "toggle-preview",
  FILL_TABLE_CELLS: "fill-table-cells",
  SET_SCALE: "set-scale",
} as const;

export type Action<
  Type extends (typeof ActionTypes)[keyof typeof ActionTypes],
  Payload,
> = {
  type: Type;
  payload: Payload;
};

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

type SetScaleAction = Action<typeof ActionTypes.SET_SCALE, { scale: number }>;

export type ConstructorAction =
  | CreateBlockAction
  | UpdateBlockAction
  | DeleteBlockAction
  | MoveBlockAction
  | UpdateChildrenWidthsAction
  | TogglePreviewAction
  | FillTableCellsAction
  | SwapBlockAction
  | SetScaleAction;

export type DropAreaCallback<Type extends DropAreaType> = (
  active: DragPayload,
  over: Extract<DropPayload, { areaType: Type }>,
  blocks: BlockMap
) => ConstructorAction[] | Promise<ConstructorAction[]>;

export type DropAreaHandlers = {
  [Type in DropAreaType]: DropAreaCallback<Type>;
};

export type DragTargetCallback<Type extends DragTargetType> = (props: {
  active: Extract<DragPayload, { targetType: Type }>;
  over: Pick<Block, "id" | "type"> | null;
  parentId: BlockId;
  direction: (typeof InsertionPlace)[keyof typeof InsertionPlace];
  blocks: BlockMap;
}) => ConstructorAction[] | Promise<ConstructorAction[]>;

export type DragTargetHandlers = {
  [Type in DragTargetType]: DragTargetCallback<Type>;
};
