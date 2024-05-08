import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TInitialState {
  selectedProduct: string[];
}

const initialState: TInitialState = {
  selectedProduct: [],
};

const productSlice = createSlice({
  initialState,
  name: "product",
  reducers: {
    setSelected: (state, action: PayloadAction<string>) => {
      state.selectedProduct.push(action.payload);
    },
    setUnSelected: (state, action: PayloadAction<string>) => {
      state.selectedProduct = state.selectedProduct.filter(
        (item) => item !== action.payload
      );
    },
    clearSelectedProducts: (state) => {
      state.selectedProduct = [];
    },
  },
});

export const { setSelected, setUnSelected, clearSelectedProducts } =
  productSlice.actions;

export default productSlice.reducer;
