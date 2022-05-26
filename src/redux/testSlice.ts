import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";




export interface testState {
  test: boolean;
  price:number
  status: "pending" | "fulfilled" | "rejected" | "fetching" | null;

}

export const initialState: testState = {
    test: false,
    price:0,
    status: null,
};

export const fetchRefPrices = createAsyncThunk("assets/fetchRefPrices", async () => {
  const res = await fetch("https://indexer.ref-finance.net/list-token-price", {
    mode: "cors",
  });
  const prices = await res.json();
  return prices;
});
export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    hideTest(state) {
     state.test=true
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRefPrices.fulfilled, (state, action) => {
          console.log(state,'state1',action);
          state.status= 'rejected'
          
    });
    builder.addCase(fetchRefPrices.pending, (state) => {
      state.status = "fetching";
    });
    builder.addCase(fetchRefPrices.rejected, (state, action) => {
      console.log(state,'state3',action);
      state.status = action.meta.requestStatus;
    });
  }
 
});


export const {
  hideTest 
}=testSlice.actions
export default testSlice.reducer;
