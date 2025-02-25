import {
  UseDraggableArguments as UseDraggableCoreArguments,
  useDraggable as useDraggableCore,
  useDroppable as useDroppableCore,
  UseDroppableArguments as UseDroppableCoreArguments,
  Over,
  Active,
  DataRef,
} from "@dnd-kit/core";
import {
  DragPayload,
  DropPayload,
} from "../components/blocks/base/shared/types/element.types";
import {
  DragTargetId,
  DropAreaId,
} from "../services/interactions/interactions.types";

type UseDraggableArguments = Omit<UseDraggableCoreArguments, "data" | "id"> & {
  id: DragTargetId;
  data: DragPayload;
};

export const useDraggable = useDraggableCore as (
  args: UseDraggableArguments
) => ReturnType<typeof useDraggableCore>;

type UseDroppableArguments = Omit<UseDroppableCoreArguments, "data" | "id"> & {
  id: DropAreaId;
  data: DropPayload;
};

type UseDroppableReturnCore = ReturnType<typeof useDroppableCore>;
type UseDroppableReturn = Omit<UseDroppableReturnCore, "over" | "active"> & {
  over:
    | (Omit<Over, "id" | "data"> & {
        id: DropAreaId;
        data: DataRef<DropPayload>;
      })
    | null;
  active:
    | (Omit<Active, "id" | "data"> & {
        id: DragTargetId;
        data: DataRef<DragPayload>;
      })
    | null;
};

export const useDroppable = useDroppableCore as (
  args: UseDroppableArguments
) => UseDroppableReturn;
