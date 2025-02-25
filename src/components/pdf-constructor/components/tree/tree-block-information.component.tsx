import { Block } from "../../shared/types/block.types";

type TreeBlockInformationProps = {
  block: Block;
};

export const TreeBlockInformation = ({ block }: TreeBlockInformationProps) => {
  if (block.type === "text") {
    return (
      <span className="text-muted-foreground overflow-hidden text-xs text-nowrap text-ellipsis">
        {block.content}
      </span>
    );
  }

  return null;
};
