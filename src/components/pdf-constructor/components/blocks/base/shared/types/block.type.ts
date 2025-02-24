import { Block } from "@/components/pdf-constructor/contexts/constructor/constructor.types";
import {
  DragTargetType,
  Edge,
} from "@/components/pdf-constructor/services/interactions/interactions.types";
import {
  BlockType,
  CustomBlockTypeDefinitions,
  GeneralBlockType,
} from "@/components/pdf-constructor/shared/constants/types-definition.constant";
import { CSSProperties, ElementType } from "react";

export type BlockProps<T extends Block> = {
  block: T;
};

export type BaseBlockProps<T extends Block> = BlockProps<T> & {
  children: React.ReactNode;
  toolbar?: React.ReactNode;
  as?: ElementType;
  positions?: Edge[];
  className?: string;
  style?: CSSProperties;
};

export type BlockMap = Partial<{
  [K in GeneralBlockType]: React.FC<
    BaseBlockProps<Extract<Block, { type: K }>>
  >;
}>;

export type DragPayload =
  | {
      id: Block["id"] | GeneralBlockType | string;
      type: GeneralBlockType;
      dragTargetType: Exclude<DragTargetType, "template">;
    }
  | {
      id: Block["id"] | GeneralBlockType | string;
      type: typeof CustomBlockTypeDefinitions.Template;
      title: string;
      dragTargetType: Extract<DragTargetType, "template">;
    };

export type DropPayload = {
  id: Block["id"];
  type: BlockType;
};
