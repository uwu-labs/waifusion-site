import { decorate, observable } from "mobx";
import BN from "bn.js";

import {
  tokenOfOwnerByIndex,
  balanceOf,
  accumulatedForIndex,
  toEthUnit,
  getWETName,
  getTokenId,
} from "../utils/contracthelper";

class WETStore {
  isClaiming = false;
  items = [];
  ownedItems = [];
  wetBalance = 0;
  totalAccumulated = 0;
  totalAccumulatedLoading = false;
  isLoading = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  updatePurchaseQuantity(quantity) {
    this.purchaseQuantity = quantity;
  }

  addOwnedItem(item) {
    if (this.ownedItems.filter((i) => i.index === item.index).length === 0)
      this.ownedItems.push(item);
  }

  updateOwnedItem(item) {
    this.ownedItems.forEach((i) => {
      if (i.index === item.index) {
        i.name = item.name;
      }
    });
  }

  setIsLoading(val) {
    this.isLoading = val;
  }

  async syncOwnedItems() {
    const balance = await balanceOf();

    for (let i = 0; i < balance; i++) {
      const index = await tokenOfOwnerByIndex(i);
      const name = await getWETName(index);
      const id = await getTokenId(index);
      const accumulated = new BN(await accumulatedForIndex(index));
      const accumulatedWETNumber =  Number(await toEthUnit(accumulated)).toFixed(2);

      if (this.items.length < balance) {
        this.addOwnedItem({ index, name, id, accumulatedWETNumber});
      }
    }
  }
}

decorate(WETStore, {
  isClaiming: observable,
  items: observable,
  wetBalance: observable,
  totalAccumulated: observable,
  totalAccumulatedLoading: observable,
  isLoading: observable,
  ownedItems: observable,
});

export default WETStore;
