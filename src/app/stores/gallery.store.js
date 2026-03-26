import { decorate, action, extendObservable } from "mobx";
import { GLOBALS } from "../utils/globals.js";

const TOTAL = GLOBALS.TOTAL_WAIFUS;

/** Clamp / wrap display id into 1..TOTAL for prev/next and jump input. */
function normalizeGalleryId(n) {
  const x = Math.floor(Number(n));
  if (!Number.isFinite(x)) return 1;
  const m = ((x - 1) % TOTAL + TOTAL) % TOTAL;
  return m + 1;
}

class GalleryStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    extendObservable(this, {
      currentImageId: 1,
      goToImageId: 1,
    });
  }

  goNext() {
    this.currentImageId = normalizeGalleryId(Number(this.currentImageId) + 1);
    this.goToImageId = this.currentImageId;
  }

  goPrev() {
    this.currentImageId = normalizeGalleryId(Number(this.currentImageId) - 1);
    this.goToImageId = this.currentImageId;
  }

  setGoToInput(val) {
    this.goToImageId = val;
  }

  applyGoToId(val) {
    const id = normalizeGalleryId(val);
    this.currentImageId = id;
    this.goToImageId = id;
  }
}

decorate(GalleryStore, {
  goNext: action,
  goPrev: action,
  setGoToInput: action,
  applyGoToId: action,
});

export default GalleryStore;
