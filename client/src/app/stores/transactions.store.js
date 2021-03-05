import { decorate, observable, computed, action } from 'mobx';
import * as _ from 'lodash';


// export class TransactionStore {
//     pendingTransactions = [{
//         transaction: {}
//     }];
//     completedTransactions = [{
//         transaction: {}
//     }];



//     addPendingTransaction({txHash, description}) {
//         const transDetail = {
//             txHash,
//             description,
//             status: 0
//         }
//         this.pendingTransactions.push(transDetail);
//     }

//     addCompletedTransaction({ txDetails, status }) {
//         this.pendingTransactions = this.pendingTransactions.filter(item => item.txHash !== txDetails.txHash);
//         if (status === true) {
//             // Vue.noty.success(
//             //   "<img src='/images/success-icon.png' style='width: 40px;'> Transaction successful for " +
//             //     txDetails.description,
//             // );
//             // const audio = new Audio('/sound/swiftly.mp3');
//             // audio.play();
//           } else {
//             // Vue.noty.error(
//             //   "<img src='/images/error-soft-icon.png' style='width: 40px;'> Transaction reverted for " +
//             //     txDetails.description,
//             // );
//           }
//           this.completedTransactions.push(txDetails);
//     }



// }

// decorate(TransactionStore, {
//     pendingTransactions: observable,
//     completedTransactions: observable
// });





class TransactionStore {

    pendingTransactions = [];
    completedTransactions = [];
    

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    addPendingTransaction({txHash, description}) {
        const transDetail = {
            txHash,
            description,
            status: 0
        }
        this.pendingTransactions.push(transDetail);
    }

    addCompletedTransaction({ txDetails, status }) {
        this.pendingTransactions = this.pendingTransactions.filter(item => item.txHash !== txDetails.txHash);
        if (status === true) {
            // Vue.noty.success(
            //   "<img src='/images/success-icon.png' style='width: 40px;'> Transaction successful for " +
            //     txDetails.description,
            // );
            // const audio = new Audio('/sound/swiftly.mp3');
            // audio.play();
          } else {
            // Vue.noty.error(
            //   "<img src='/images/error-soft-icon.png' style='width: 40px;'> Transaction reverted for " +
            //     txDetails.description,
            // );
          }
          this.completedTransactions.push(txDetails);
    }
}
decorate(TransactionStore, {

    pendingTransactions: observable,
    completedTransactions: observable
});

export default TransactionStore;
