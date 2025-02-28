import { Columns2Icon } from "lucide-react";
import { BlockThumbnail } from "../block-thumbnail.component";
import { BlockTypeDefinitions } from "@/components/pdf-constructor/features/core/constants/types-definition.constant";

export const BlockColumnThumbnail = () => (
  <BlockThumbnail
    type={BlockTypeDefinitions.Column}
    title="Column"
    icon={(props) => <Columns2Icon {...props} />}
  />
);
