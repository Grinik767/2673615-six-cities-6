import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City } from '../../types/offer';
import { INITIAL_CITY, NameSpace, SortingOption } from '../../const';

export type AppProcess = {
  city: City;
  sortingOption: SortingOption;
};

const initialState: AppProcess = {
  city: INITIAL_CITY,
  sortingOption: SortingOption.Popular,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    setSortingOption: (state, action: PayloadAction<SortingOption>) => {
      state.sortingOption = action.payload;
    },
  },
});

export const { changeCity, setSortingOption } = appProcess.actions;
