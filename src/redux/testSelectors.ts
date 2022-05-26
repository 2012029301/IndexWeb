import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "./store";
import { transformAsset } from "./utils";

export const getTest = createSelector(
    (state: RootState) => state.test,
    (test) => test.test,
  );
  export const isTestLoading = createSelector(
    (state: RootState) => state.test,
    (test) => test.status === "pending",
  );
  export const isTestSuccess = createSelector(
    (state: RootState) => state.test,
    (test) => test.status === "fulfilled",
  );
  export const isTestFailed = createSelector(
    (state: RootState) => state.test,
    (test) => test.status === "rejected",
  );
  
  
  