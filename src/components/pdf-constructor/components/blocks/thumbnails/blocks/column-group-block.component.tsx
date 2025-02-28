import { ColumnsIcon } from "lucide-react";
import { BlockThumbnail } from "../block-thumbnail.component";
import { BlockTypeDefinitions } from "@/components/pdf-constructor/features/core/constants/types-definition.constant";

export const BlockColumnGroupThumbnail = () => (
  <BlockThumbnail
    type={BlockTypeDefinitions.ColumnGroup}
    title="Column Group"
    icon={(props) => <ColumnsIcon {...props} />}
  />
);
