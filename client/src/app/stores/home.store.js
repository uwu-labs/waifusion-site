import { decorate, observable, computed, action } from 'mobx';
import * as _ from 'lodash';


// export class HomeStore {
//     pendingBuy = "";
//     isBuyModalOpen = "";
//     validationResults = "";
//     purchaseQuantity = "";
//     remainingAtCurrentPrice = "";
//     saleStarted = "";
//     nftPrice = "";

//     updatePurchaseQuantity (quantity) {
//         this.purchaseQuantity = quantity;
//     }

// }
// decorate(HomeStore, {
//     pendingBuy: observable,
//     isBuyModalOpen: observable,
//     validationResults: observable,
//     purchaseQuantity: observable,
//     updatePurchaseQuantity: action,
//     remainingAtCurrentPrice: observable,
//     saleStarted: observable,
//     nftPrice: observable
// })


class HomeStore {
    pendingBuy = false;
    isBuyModalOpen = false;
    validationResults = '';
    purchaseQuantity = 1;
    remainingAtCurrentPrice = 10;
    saleStarted = false;
    nftPrice = 0.1;
    progressArray = [];

    constructor(rootStore) {
        this.rootStore = rootStore;
    }


    updatePurchaseQuantity (quantity) {
        this.purchaseQuantity = quantity;
    }
}
decorate(HomeStore, {
    pendingBuy: observable,
    isBuyModalOpen: observable,
    validationResults: observable,
    purchaseQuantity: observable,
    updatePurchaseQuantity: action,
    remainingAtCurrentPrice: observable,
    saleStarted: observable,
    nftPrice: observable,
    progressArray: observable
});

export default HomeStore;
