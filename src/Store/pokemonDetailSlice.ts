import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchPokemonDetailApi,
  PokemonDetailType,
} from "../Service/pokemonService";
import { RootState } from ".";

export const fetchPokemonDetail = createAsyncThunk(
  "pokemon/fetchPokemonDetail",
  // Declare the type your function argument here:
  async (name: string) => {
    const response = await fetchPokemonDetailApi(name);
    return response;
  },
  {
    condition: (name, { getState }) => {
      const { details } = getState() as RootState;
      return !details.pokemonDetails[name];
    },
  }
);

interface PokemonDetailState {
  pokemonDetails: Record<string, PokemonDetailType>;
}

const initialState = {
  pokemonDetails: {},
} as PokemonDetailState;

const pokemonDetailSlice = createSlice({
  name: "pokemonDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchPokemonDetail.fulfilled,
      (state, action: PayloadAction<PokemonDetailType>) => {
        state.pokemonDetails = {
          ...state.pokemonDetails,
          [action.payload.name]: action.payload,
        };
      }
    );
  },
});

export const pokemonDetailReducer = pokemonDetailSlice.reducer;
