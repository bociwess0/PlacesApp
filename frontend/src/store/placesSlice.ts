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
      state.places = state.places.filter(
        (place: Place) => place._id != action.payload.placeId,
      );
    },
    updatePlaceItem: (state, action: PayloadAction<{ place: Place }>) => {
      const placeIndex = state.places.findIndex(
        (place) => place._id === action.payload.place._id,
      );

      if (placeIndex !== -1) {
        state.places[placeIndex] = action.payload.place;
      }
    },
  },
});

const placesReducer = placesSlice.reducer;

export const setPlaces = placesSlice.actions.setPlaces;
export const setSearchTerm = placesSlice.actions.setSearchTerm;
export const deletePlaceItem = placesSlice.actions.deletePlaceItem;
export const updatePlaceItem = placesSlice.actions.updatePlaceItem;

export default placesReducer;
