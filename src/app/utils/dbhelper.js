import { GLOBALS } from "./globals.js";

/** Fetch metadata JSON at manifest index `id` (1:1 with gallery image `{id}.png`). */
export const getWaifuTraitsById = async (id) => {
  const n = Math.floor(Number(id));
  const idx = Number.isFinite(n) ? n : 1;
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
