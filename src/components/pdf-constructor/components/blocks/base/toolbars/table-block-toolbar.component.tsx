import { BlockElementProps } from "../shared/types/element.types";
import { TableBlock as TableBlockType } from "@/components/pdf-constructor/shared/types/block.types";
import { Toolbar } from "./toolbar.component";
import { useBlockUpdate } from "@/components/pdf-constructor/hooks/use-block-update.hook";

export const TableBlockToolbar: React.FC<BlockElementProps<TableBlockType>> = ({
  block,
}) => {
  const [value, setValue] = useBlockUpdate(block);

  return (
    <Toolbar title="Table">
      <input
        className="focus-within:ring-ring w-full rounded border px-2 py-1 outline-none focus-within:ring-2"
        value={value.paddingLeft}
        onChange={(event) =>
          setValue("paddingLeft", Number(event.target.value))
        }
      />
      <input
        className="focus-within:ring-ring w-full rounded border px-2 py-1 outline-none focus-within:ring-2"
        value={value.paddingRight}
        onChange={(event) =>
          setValue("paddingRight", Number(event.target.value))
        }
      />
      <input
        className="focus-within:ring-ring w-full rounded border px-2 py-1 outline-none focus-within:ring-2"
        value={value.paddingTop}
        onChange={(event) => setValue("paddingTop", Number(event.target.value))}
      />
      <input
        className="focus-within:ring-ring w-full rounded border px-2 py-1 outline-none focus-within:ring-2"
        value={value.paddingBottom}
        onChange={(event) =>
          setValue("paddingBottom", Number(event.target.value))
        }
      />
    </Toolbar>
  );
};
