import { Rows2Icon } from "lucide-react";
import { BlockTypeDefinitions } from "@/components/pdf-constructor/features/core/constants/types-definition.constant";
import { BlockThumbnail } from "../../block-thumbnail.component";

export const TableRowBlockThumbnail = () => (
  <BlockThumbnail
    type={BlockTypeDefinitions.TableRow}
    title="Table Row"
    icon={(props) => <Rows2Icon {...props} />}
  />
);
