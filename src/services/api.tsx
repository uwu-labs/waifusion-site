const API_BASE =
  "https://k35qjfgcwhgv42yg2wamjsu7n3i3p5owweuxehxonhi6elerwquq.arweave.net/VvsElMKxzV5rBtWAxMqfbtG39daxKXIe7mnR4iyRtCk/";

export interface WaifusionAPIResponse {
  success: boolean;
  body?: any;
  error?: WaifusionError;
}
interface WaifusionError {
  code: string;
  message?: string;
}

interface ArweaveWaifuInfo {
  index: number;
  attributes: [];
  name: string;
  description: string;
  image: string;
}
const initial: ArweaveWaifuInfo = {
  index: 0,
  attributes: [],
  name: "",
  description: "",
  image: "",
};

export const makeRequest = async (
  endpoint: string,
  {
    method = "GET",
  }: {
    method?: string;
  }
): Promise<ArweaveWaifuInfo> => {
  try {
    const headers: { [key: string]: string } = {
      accept: "application/json",
    };

    const response: ArweaveWaifuInfo = await fetch(API_BASE + endpoint, {
      method,
      headers,
    }).then(async (res) =>
      res.status === 204 ? { success: true } : res.json()
    );

    return response || {};
  } catch (error) {
    console.error(error);
    return initial;
  }
};
