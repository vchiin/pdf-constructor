import { ImageIcon } from "lucide-react";
import { BlockTypeDefinitions } from "@/components/pdf-constructor/shared/constants/types-definition.constant";

import { BlockThumbnail } from "../block-thumbnail.component";

export const ImageBlockThumbnail = () => (
  <BlockThumbnail
    type={BlockTypeDefinitions.Image}
    title="Image"
    icon={(props) => <ImageIcon {...props} />}
  />
);
