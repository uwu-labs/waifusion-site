import { decorate, observable } from "mobx";

class WETStore {
  isClaiming = false;
  items = [];
  ownedItems = [
    {
      index: 42,
      name: "Demo Sakura",
      id: 42,
      accumulatedWETNumber: "12.34",
    },
    {
      index: 7,
      name: "Demo Mika",
      id: 7,
      accumulatedWETNumber: "56.78",
    },
  ];
  wetBalance = "1337.00";
  totalAccumulated = "99.99";
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
    return undefined;
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
