export interface WaifuOwnerType {
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
  owner?: WaifuOwnerType;
  accumulatedWet?: number;
  attributes?: Attribute[];
}
