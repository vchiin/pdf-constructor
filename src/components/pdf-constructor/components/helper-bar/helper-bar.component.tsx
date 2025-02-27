import { useMemo } from "react";

import { usePreview } from "@/components/pdf-constructor/features/constructor/contexts/preview/pdf-preview.context";
import { findBlock } from "@/components/pdf-constructor/features/constructor/contexts/constructor/pdf-constructor-context.utils";
import { useConstructor } from "@/components/pdf-constructor/features/constructor/contexts/constructor/pdf-constructor.context";

export const HelperBar = () => {
  const { map } = useConstructor();
  const { selectedBlockId, deselectBlock } = usePreview();
  const block = useMemo(() => {
    if (selectedBlockId === null) {
      return null;
    }

    return findBlock(selectedBlockId, map);
  }, [selectedBlockId, map]);

  if (!block) {
    return null;
  }

  return (
    <div
      role="button"
      className="fixed bottom-10 left-1/2 z-10 -translate-x-1/2 cursor-pointer rounded bg-yellow-200 px-4 py-2 shadow-lg"
      onClick={deselectBlock}
    >
      You have selected a block{" "}
      <b className="capitalize">
        {block.id} {block.type}
      </b>
      . If you want to unselect it click here.
    </div>
  );
};
