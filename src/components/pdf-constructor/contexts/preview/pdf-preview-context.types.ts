import { RefObject } from "react";
import { BlockId } from "../../shared/types/utils.types";

export type PreviewContextType = {
  containerRef: RefObject<HTMLDivElement>;
  selectedBlockId: BlockId | null;
  selectBlock: (id: BlockId) => void;
  deselectBlock: () => void;
  appendProtectedElement: (element: HTMLElement) => void;
  removeProtectedElement: (element: HTMLElement) => void;
};
