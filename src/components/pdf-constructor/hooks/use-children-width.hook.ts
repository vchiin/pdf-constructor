import { useEffect, useState } from "react";
import { BlockId } from "../shared/types/utils.types";
import { useConstructor } from "../contexts/constructor/pdf-constructor.context";

export const useChildrenWidth = (parentId: BlockId, childrenAmount: number) => {
  const [widths, setWidths] = useState<number[]>(
    Array(childrenAmount).fill(100 / (childrenAmount || 1))
  );
  const { updateChildrenWidths } = useConstructor();

  useEffect(() => {
    if (childrenAmount === widths.length) {
      return;
    }

    const newWidths = Array(childrenAmount).fill(100 / (childrenAmount || 1));

    setWidths(newWidths);
    updateChildrenWidths(parentId, newWidths);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childrenAmount]);

  useEffect(() => {
    updateChildrenWidths(parentId, widths);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widths]);

  return [widths, setWidths] as const;
};
