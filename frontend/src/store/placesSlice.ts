import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Place } from "../types";

interface PlacesState {
  places: Place[];
  searchTerm: string;
}

const initialState: PlacesState = {
  places: [],
  searchTerm: "",
};

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    setPlaces: (state, action: PayloadAction<{ places: Place[] }>) => {
      state.places = action.payload.places;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    deletePlaceItem: (state, action: PayloadAction<{ placeId: string }>) => {
      state.places = state.places.filter((place: Place) => place._id != action.payload.placeId)
    },
  },
});

const placesReducer = placesSlice.reducer;

export const setPlaces = placesSlice.actions.setPlaces;
export const setSearchTerm = placesSlice.actions.setSearchTerm;
export const deletePlaceItem = placesSlice.actions.deletePlaceItem;

export default placesReducer;
