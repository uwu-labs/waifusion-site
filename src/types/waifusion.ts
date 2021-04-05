export interface Attribute {
  trait_type: string;
  value: string;
}

export interface Waifu {
  id: number;
  name?: string;
  accumulatedWet?: number;
  attributes?: Attribute[];
}
