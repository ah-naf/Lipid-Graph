import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lipid: [],
  type: 'single',
  operationID: '0'
};

export const lipidSlice = createSlice({
  name: "lipid",
  initialState,
  reducers: {
    changeActiveLipid: (state, { payload }) => {
      state.lipid = payload;
    },
    changeNumOfComp: (state, {payload}) => {
        state.type = payload
    },
    changeOperationID: (state, {payload}) => {
        state.operationID = payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { changeActiveLipid, changeNumOfComp, changeOperationID } = lipidSlice.actions;

export default lipidSlice.reducer;
