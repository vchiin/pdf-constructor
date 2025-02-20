import { BlockTypeDefinitions } from "@/components/pdf-constructor/shared/constants/types-definition.constant";

import { BlockThumbnail } from "../../block-thumbnail.component";
import { TableIcon } from "lucide-react";

export const TableBlockThumbnail = () => (
  <BlockThumbnail
    type={BlockTypeDefinitions.Table}
    title="Table"
    icon={(props) => <TableIcon {...props} />}
  />
);
