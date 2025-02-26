import { Block } from "@/components/pdf-constructor/shared/types/block.types";
import {
  DragTargetType,
  Edge,
  Interaction,
} from "@/components/pdf-constructor/services/interactions/interactions.types";
import {
  BlockType,
  CustomBlockTypeDefinitions,
  GenericBlockType,
} from "@/components/pdf-constructor/shared/constants/types-definition.constant";
import { CSSProperties, ElementType } from "react";
import { interactions } from "@/components/pdf-constructor/services/interactions/interactions.service";

export type BlockElementProps<T extends Block> = {
  block: T;
};

export type BaseBlockElementProps<T extends Block> = BlockElementProps<T> & {
  children?: React.ReactNode;
  toolbar?: React.ReactNode;
  as?: ElementType;
  positions?: Edge[];
  className?: string;
  style?: CSSProperties;
  hideSelectionIndicators?: boolean;
};

export type BlockElement<B extends Block> = React.FC<BaseBlockElementProps<B>>;

type BlockElementMap = {
  [K in BlockType]: BlockElement<Extract<Block, { type: K }>>;
};

type BlockElementMapInteraction = typeof interactions;

// Maps restrictions from the Interactions to the Block Map components, therefore picks the Block Maps elements based on the interactions map
export type GenericBlockElementMap<T extends BlockType> =
  T extends keyof BlockElementMapInteraction
    ? BlockElementMapInteraction[T] extends Interaction
      ? BlockElementMapInteraction[T]["accepts"] extends GenericBlockType[]
        ? Pick<
            BlockElementMap,
            Extract<BlockElementMapInteraction[T]["accepts"][number], BlockType>
          >
        : BlockElementMapInteraction[T]["forbids"] extends GenericBlockType[]
          ? Omit<
              BlockElementMap,
              BlockElementMapInteraction[T]["forbids"][number]
            >
          : never
      : never
    : never;

export type DragPayload =
  | {
      id: Block["id"] | GenericBlockType | string;
      type: GenericBlockType;
      dragTargetType: Exclude<DragTargetType, "template">;
    }
  | {
      id: Block["id"] | GenericBlockType | string;
      type: typeof CustomBlockTypeDefinitions.Template;
      title: string;
      dragTargetType: Extract<DragTargetType, "template">;
    };

export type DropPayload = {
  id: Block["id"];
  type: BlockType;
};
