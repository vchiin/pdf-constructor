import { Block } from "@/components/pdf-constructor/contexts/constructor/constructor.types";
import {
  DragTargetType,
  Edge,
} from "@/components/pdf-constructor/services/interactions/interactions.types";
import { BlockType } from "@/components/pdf-constructor/shared/constants/types-definition.constant";
import { ElementType } from "react";

export type BlockProps<T extends Block> = {
  block: T;
};

export type BaseBlockProps<T extends Block> = BlockProps<T> & {
  children: React.ReactNode;
  toolbar?: React.ReactNode;
  as?: ElementType;
  positions?: Edge[];
  className?: string;
};

export type BlockMap = Partial<{
  [K in BlockType]: React.FC<BaseBlockProps<Extract<Block, { type: K }>>>;
}>;

export type DragPayload = {
  id: Block["id"] | BlockType;
  type: BlockType;
  dragTargetType: DragTargetType;
};

export type DropPayload = {
  id: Block["id"];
  type: BlockType;
};
