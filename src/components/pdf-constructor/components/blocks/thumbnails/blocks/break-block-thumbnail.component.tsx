import { TableRowsSplitIcon } from "lucide-react";
import { BlockThumbnail } from "../block-thumbnail.component";
import { BlockTypeDefinitions } from "@/components/pdf-constructor/shared/constants/types-definition.constant";

export const BreakBlockThumbnail = () => (
  <BlockThumbnail
    type={BlockTypeDefinitions.Break}
    title="Break"
    icon={(props) => <TableRowsSplitIcon {...props} />}
  />
);
