import { decorate, observable, computed, action } from 'mobx';
import { create, persist } from 'mobx-persist'
import * as _ from 'lodash';

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

    updatePurchaseQuantity (quantity) {
        this.purchaseQuantity = quantity;
    }

    addOwnedItem(item) {
        if(this.ownedItems.filter(i=> i.index == item.index).length == 0)
            this.ownedItems.push(item);
    }
    updateOwnedItem(item)
    {
        this.ownedItems.forEach(i => {
            if(i.index==item.index)
            {
                i.name = item.name;
            }
            
        });
        
    }

    setIsLoading(val)
    {
        this.isLoading = val;
    }
}

decorate(WETStore, {

    isClaiming: observable,
    items: observable,
    wetBalance: observable,
    totalAccumulated: observable,
    totalAccumulatedLoading: observable,
    isLoading: observable,
    ownedItems: observable

});

export default WETStore;
