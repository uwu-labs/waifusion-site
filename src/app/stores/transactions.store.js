import { decorate, observable } from "mobx";

class TransactionStore {
  pendingTransactions = [];
  completedTransactions = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  addPendingTransaction({ txHash, description }) {
    const transDetail = {
      txHash,
      description,
      status: 0,
    };
    this.pendingTransactions.push(transDetail);
  }

  addCompletedTransaction({ txDetails, status }) {
    this.pendingTransactions = this.pendingTransactions.filter(
      (item) => item.txHash !== txDetails.txHash
    );
    this.completedTransactions.push(txDetails);
  }
}
decorate(TransactionStore, {
  pendingTransactions: observable,
  completedTransactions: observable,
});

export default TransactionStore;
