import { GLOBALS } from "./globals.js";

const revealedImageIndex = (tokenId) => {
  return (Number(tokenId) + GLOBALS.STARTING_INDEX) % 16384;
};

export const getWaifuTraitsById = async (id) => {
  const idx = revealedImageIndex(id);
  const url = `${GLOBALS.ARWEAVE_TOKEN_METADATA_BASE}/${idx}`;
  try {
    const r = await fetch(url);
    if (!r.ok) return { attributes: [] };
    const data = await r.json();
    if (data.attributes && Array.isArray(data.attributes)) return data;
    if (Array.isArray(data)) return { attributes: data };
    return { attributes: [] };
  } catch {
    return { attributes: [] };
  }
};
