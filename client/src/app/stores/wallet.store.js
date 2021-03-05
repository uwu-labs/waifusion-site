import { decorate, observable, computed, action, makeAutoObservable } from 'mobx';
import { create, persist } from 'mobx-persist'
import * as _ from 'lodash';
import { autoSave } from '../utils/autoSave';


// export class WalletStore {
//     type = "";
//     defaultAddress = "";
    
//     hasAccount() {
//         return !_.isEmpty(this.defaultAddress)
//     }
// }

// decorate(WalletStore, {
//     type: [persist,observable],
//     defaultAddress: [persist,observable],
//     hasAccount: computed
// });

class WalletStore {
    type = '';
    defaultAddress = '';
    isWalletConnected = false;
    web3 = null;
    isPendingApproval = false;
    isApproved = false;

    
    
    constructor(rootStore) {
        //makeAutoObservable(this);
        this.type = '';
        this.defaultAddress ='';
        this.isWalletConnected = false;
        this.web3 = null;
        this.isPendingApproval = false;
        this.isApproved = false;
        this.rootStore = rootStore;
        
        autoSave(this, 'walletStore');
        console.log("Wallet Store Contructor");
    }

    get hasAccount() {
        return !_.isEmpty(this.defaultAddress)
    }

}
decorate(WalletStore, {
    defaultAddress: observable,
    hasAccount: computed,
    contract: observable,
    wetContract: observable,
    web3: observable,
    isPendingApproval: observable,
    isApproved: observable,
    isWalletConnected: observable
    // walletWeb: observable,
    // walletInstance: observable

});

export default WalletStore;
