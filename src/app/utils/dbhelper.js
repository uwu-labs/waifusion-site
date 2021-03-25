import { GLOBALS } from "./globals.js";
const IPFS = require("ipfs-core");
let node = null;

const getIpfsNode = async () => {
  if (node == null) {
    node = await IPFS.create();
  }
  return node;
};

var getImageIdFromIndex = (index) => {
  return (
    (new Number.parseInt(index) + GLOBALS.STARTING_INDEX) %
    16384
  ).toString();
};

const cleanWaifus = (waifus) => {
  //all the info in a json format to make filtering easy
  return waifus.map((waifu) => {
    return {
      index: waifu["index"],
      sha256: waifu.sha256,
      HeadAccessory: waifu.HeadAccessory,
      headaccessoryStyle: waifu.headaccessoryStyle,
      Top: waifu.Top,
      TopColor: waifu.TopColor,
      Bottom: waifu.Bottom,
      BottomColor: waifu.BottomColor,
      Wings: waifu.Wings,
      WingsColor: waifu.WingsColor,
      Tail: waifu.Tail,
      TailColor: waifu.TailColor,
      HandAccessory: waifu.HandAccessory,
      Skintone: waifu.Skintone,
      BodySize: waifu.BodySize,
      Background: waifu.Background,
      BackgroundStyle: waifu.BackgroundStyle,
      Face: waifu.Face,
      Hairstyle: waifu.Hairstyle,
      HairColor: waifu.HairColor,
      Eyes: waifu.Eyes,
      SpeechBubble: waifu.SpeechBubble,
      Socks: waifu.Socks,
      SocksColor: waifu.SocksColor,
      NeckAccessory: waifu.NeckAccessory,
      NeckAccessoryColor: waifu.NeckAccessoryColor,
      previewUrl: GLOBALS.WAIFUS_VIEWABLE_URL.concat(
        "/",
        getImageIdFromIndex(waifu["index"]),
        ".png"
      ),
    };
  });
};

const loadWaifus = async () => {
  //This is the one that grabs all the info from ipfs
  //names.json
  //Parses the json
  //GLOBALS.WAIFUS_URL
  var cleanedWaifus = [];
  try {
    let client = await getIpfsNode();
    const stream = client.cat(GLOBALS.WAIFUS_JSON_HASH);
    let data = "";

    for await (const chunk of stream) {
      // chunks of data are returned as a Buffer, convert it back to a string
      data += chunk.toString();
    }
    var waifuArray = JSON.parse(data);
    cleanedWaifus = cleanWaifus(waifuArray);
  } catch (error) {}

  return cleanedWaifus;
};

const getWaifus = ({ offest, limit, filter, search }) => {
  //This grabs the waifus that meet criteria i.e. pagination
};

const getWaifuById = async (id) => {
  //return waifus in waifus from server?
  var waifusArr = await loadWaifus();
  debugger;
  var result = waifusArr.find((item) => {
    return item.index === id;
  });
  return result;
};

const getWaifuTraitsById = async (id) => {
  try {
    let client = await getIpfsNode();
    var url = GLOBALS.WAIFUS_TRAITS_HASH + "/" + id + ".json";
    const stream = client.cat(url);
    let data = "";

    for await (const chunk of stream) {
      // chunks of data are returned as a Buffer, convert it back to a string
      data += chunk.toString();
    }

    const waifuData = JSON.parse(data);

    return waifuData;

    // The code below was part of the branch before but it handled the IPFS data wrong.
    // cleanedWaifu = cleanWaifu(waifuArray);
    // console.log(cleanedWaifu);
    // return cleanedWaifu;
  } catch (error) {}
};

export { loadWaifus, getWaifus, getWaifuById, getWaifuTraitsById };
