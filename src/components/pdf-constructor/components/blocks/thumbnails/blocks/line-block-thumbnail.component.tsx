import { PenLineIcon } from "lucide-react";
import { BlockThumbnail } from "../block-thumbnail.component";
import { BlockTypeDefinitions } from "@/components/pdf-constructor/shared/constants/types-definition.constant";
export const LineBlockThumbnail = () => (
  <BlockThumbnail
    type={BlockTypeDefinitions.Line}
    title="Line"
    icon={(props) => <PenLineIcon {...props} />}
  />
);
