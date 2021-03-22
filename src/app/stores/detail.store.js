import { decorate, observable } from "mobx";

class DetailStore {
  isPendingNameChange = false;
  nameValidation = "";
  currentName = "";
  changedName = "";
  changeNamePending = false;
  isinsufficientBalance = false;
  owner = "";
  accumulatedWET = 0;
  wetBalance = 0;
  isPendingApproval = false;
  isApproved = false;
  currentWaifu = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  updateChangedName(cn) {
    this.changedName = cn;
  }
}
decorate(DetailStore, {
  isPendingNameChange: observable,
  nameValidation: observable,
  currentName: observable,
  changedName: observable,
  changeNamePending: observable,
  isinsufficientBalance: observable,
  owner: observable,
  accumulatedWET: observable,
  wetBalance: observable,
  isPendingApproval: observable,
  isApproved: observable,
  currentWaifu: observable,
});

export default DetailStore;
