import { createContext } from "react";

import WalletStore from "./wallet.store";
import WETStore from "./wet.store";
import TransactionStore from "./transactions.store";
import DetailStore from "./detail.store";
import GalleryStore from "./gallery.store";
import { observable, decorate } from "mobx";

class RootStore {
  walletStore = new WalletStore(this);
  WETStore = new WETStore(this);
  transactionStore = new TransactionStore(this);
  detailStore = new DetailStore(this);
  galleryStore = new GalleryStore(this);
}

decorate(RootStore, {
  walletStore: observable,
  WETStore: observable,
  transactionStore: observable,
  detailStore: observable,
  galleryStore: observable,
});

export const RootStoreContext = createContext(new RootStore());
