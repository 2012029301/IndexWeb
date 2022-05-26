import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { hasAssets, toUsd } from "../utils";
import { getExtraDailyTotals } from "./getExtraDailyTotals";
import { testState } from "../testSlice";
import { Portfolio } from "../accountSlice";

