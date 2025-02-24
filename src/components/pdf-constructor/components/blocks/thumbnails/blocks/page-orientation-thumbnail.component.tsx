import { RatioIcon } from "lucide-react";
import { BlockThumbnail } from "../block-thumbnail.component";
import { BlockTypeDefinitions } from "@/components/pdf-constructor/shared/constants/types-definition.constant";

export const PageOrientationBlockThumbnail = () => (
  <BlockThumbnail
    type={BlockTypeDefinitions.PageOrientation}
    title="Page Orientation"
    icon={(props) => <RatioIcon {...props} />}
  />
);
