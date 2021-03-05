import { createContext } from 'react';
import { create } from "mobx-persist";

import WalletStore from './wallet.store';
import HomeStore from './home.store';
import WETStore from './wet.store';
import TransactionStore from './transactions.store';
import DetailStore from './detail.store';
import GalleryStore from './gallery.store';
import { observable, action, decorate, makeAutoObservable } from 'mobx';

import autoSave from '../utils/autoSave';

class RootStore {
    //makeAutoObservable(this);
    walletStore = new WalletStore(this);
    homeStore = new HomeStore(this);
    WETStore = new WETStore(this);
    transactionStore = new TransactionStore(this);
    detailStore = new DetailStore(this);
    galleryStore = new GalleryStore(this);

}

decorate(RootStore, {
    walletStore: observable, 
    homeStore: observable, 
    WETStore: observable,
    transactionStore: observable, 
    detailStore: observable,
    galleryStore: observable
})


export const RootStoreContext = createContext(new RootStore());


