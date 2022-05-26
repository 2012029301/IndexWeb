import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { toUsd, sumReducer, hasAssets } from "../utils";

export const getTotalBalance = (source: "borrowed" | "supplied") =>
  createSelector(
    (state: RootState) => state.assets,
    (assets) => {
      
      if (!hasAssets(assets)) return 0;
      const { data } = assets;
      // console.log('assets',assets,'1111','toUsd','data',data,source,);

      return Object.keys(data)
        .map(
          (tokenId) =>{
            // console.log('source',source,toUsd(data[tokenId][source].balance, data[tokenId]),'dddddddddddddd',toUsd(data[tokenId].reserved, data[tokenId]),'tokenId',tokenId,'data[tokenId]',data[tokenId]);
            
            return  toUsd(data[tokenId][source].balance, data[tokenId]) +
            (source === "supplied" ? toUsd(data[tokenId].reserved, data[tokenId]) : 0)
          }
           
        )
        .reduce(sumReducer, 0);
    },
  );
