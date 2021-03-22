import { decorate, observable, action } from "mobx";
import { GLOBALS } from "../utils/globals.js";

const revealedWaifuIndex = (waifuIndex) => {
  return (
    (((Number(waifuIndex) + GLOBALS.STARTING_INDEX) % 16384) + 16384) % 16384
  );
};

class GalleryStore {
  currentViewIndex = 0;
  goToIndex = 0;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  incrementViewIndex() {
    this.currentViewIndex = revealedWaifuIndex(
      Number(this.currentViewIndex) + 1
    );
    this.goToIndex = this.currentViewIndex;
  }
  decrementViewIndex() {
    this.currentViewIndex = revealedWaifuIndex(
      Number(this.currentViewIndex) - 1
    );
    this.goToIndex = this.currentViewIndex;
  }
  updateGoToIndex(val) {
    this.goToIndex = val;
  }

  updateCurrentViewIndex(val) {
    this.currentViewIndex = val;
    this.goToIndex = val;
  }
}
decorate(GalleryStore, {
  currentViewIndex: observable,
  incrementViewIndex: action,
  decrementViewIndex: action,
  updateGoToIndex: action,
  updateCurrentViewIndex: action,
  goToIndex: observable,
});

export default GalleryStore;
