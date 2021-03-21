import { GLOBALS } from "./globals";

export const revealedWaifuIndex = (waifuIndex) => {
    return (Number(waifuIndex) + GLOBALS.STARTING_INDEX) % 16384;
};
