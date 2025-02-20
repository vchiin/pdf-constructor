interface Distinct<Name> {
  __DISTINCT__: Name;
}

export type BlockId = string & Distinct<"block">;
