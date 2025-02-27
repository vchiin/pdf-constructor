import { BlockId } from "@/components/pdf-constructor/shared/types/utils.types";
import { RefObject } from "react";

export type PreviewContextType = {
  containerRef: RefObject<HTMLDivElement>;
  selectedBlockId: BlockId | null;
  selectBlock: (id: BlockId) => void;
  deselectBlock: () => void;
};
