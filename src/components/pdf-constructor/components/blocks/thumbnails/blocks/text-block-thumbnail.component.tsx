import { TextIcon } from "lucide-react";
import { BlockThumbnail } from "../block-thumbnail.component";
import { BlockTypeDefinitions } from "@/components/pdf-constructor/shared/constants/types-definition.constant";

export const TextBlockThumbnail = () => (
  <BlockThumbnail
    type={BlockTypeDefinitions.Text}
    title="Text"
    icon={(props) => <TextIcon {...props} />}
  />
);
