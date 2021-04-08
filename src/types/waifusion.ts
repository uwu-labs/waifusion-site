export interface WaifuOwner {
  address: string;
  name?: string;
  icon?: string;
}

export interface Attribute {
  trait_type: string;
  value: string;
}

export interface Waifu {
  id: number;
  name?: string;
  bio?: string;
  waifuOwner?: WaifuOwner;
  accumulatedWet?: number;
  attributes?: Attribute[];
}
