import React from "react";
import { Link } from "react-router-dom";

import { GLOBALS } from "../app/utils/globals.js";
import { revealedWaifuIndex } from "../app/utils/waifuDisplay.js";

export default ({cardIndex}) => {
  return (
    <Link to={"/app/detail/" + cardIndex}>
      <img loading="lazy" decoding="async"
        alt=""
        src={
          GLOBALS.GALLERY_VIEWABLE_URL === ""
            ? GLOBALS.DEFAULT_WAIFU_IMAGE
            : GLOBALS.GALLERY_VIEWABLE_URL +
              "/" +
              revealedWaifuIndex(cardIndex) +
              ".png"
        }
      />
      <br />
    </Link>
  )
}