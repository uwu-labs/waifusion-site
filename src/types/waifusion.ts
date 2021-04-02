export interface Trait {
  type: string;
  value: string;
}

export interface Waifu {
  id: number;
  name?: string;
  traits?: Trait[];
  accumulatedWet?: number;
}
