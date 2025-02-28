import { SquareIcon } from "lucide-react";
import { BlockTypeDefinitions } from "@/components/pdf-constructor/features/core/constants/types-definition.constant";
import { BlockThumbnail } from "../../block-thumbnail.component";

export const TableCellBlockThumbnail = () => (
  <BlockThumbnail
    type={BlockTypeDefinitions.TableCell}
    title="Table Cell"
    icon={(props) => <SquareIcon {...props} />}
  />
);
