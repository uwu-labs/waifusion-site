import { decorate, action, extendObservable } from "mobx";
import { GLOBALS } from "../utils/globals.js";

const TOTAL = GLOBALS.TOTAL_WAIFUS;

/** Map any integer input to gallery image id in 1..TOTAL (wraps). */
function normalizeImageId(n) {
  const x = Math.floor(Number(n));
  if (!Number.isFinite(x)) return 1;
  const m = ((x - 1) % TOTAL + TOTAL) % TOTAL;
  return m + 1;
}

class GalleryStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    // Class fields would shadow prototype `decorate` observables (MobX 5 + Vite);
    // instance observables must live on `this` via extendObservable.
    extendObservable(this, {
      currentImageId: 1,
      goToImageId: 1,
    });
  }

  incrementViewIndex() {
    this.currentImageId = normalizeImageId(Number(this.currentImageId) + 1);
    this.goToImageId = this.currentImageId;
  }
  decrementViewIndex() {
    this.currentImageId = normalizeImageId(Number(this.currentImageId) - 1);
    this.goToImageId = this.currentImageId;
  }
  updateGoToIndex(val) {
    this.goToImageId = val;
  }

  updateCurrentViewIndex(val) {
    const id = normalizeImageId(val);
    this.currentImageId = id;
    this.goToImageId = id;
  }
}
decorate(GalleryStore, {
  incrementViewIndex: action,
  decrementViewIndex: action,
  updateGoToIndex: action,
  updateCurrentViewIndex: action,
});

export default GalleryStore;
