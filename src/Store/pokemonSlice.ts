import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchPokemonsApi,
  PokemonListResponseType,
} from "../Service/pokemonService";
import { RootState } from ".";

export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  // Declare the type your function argument here:
  async (nextUrl?: string) => {
    const response = await fetchPokemonsApi(nextUrl);
    return response;
  },
  {
    condition(nextUrl, { getState }) {
      const { pokemons } = getState() as RootState;
      if (!nextUrl && pokemons.pokemons.results.length > 0) return false;
      return true;
    },
  }
);

interface PokemonState {
  pokemons: PokemonListResponseType;
}

const initialState = {
  pokemons: { count: 0, next: "", previous: null, results: [] },
} as PokemonState;

const pokemonSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchPokemons.fulfilled,
      (state, action: PayloadAction<PokemonListResponseType>) => {
        if (state.pokemons.results.length > 0) {
          state.pokemons = {
            ...action.payload,
            results: [...state.pokemons.results, ...action.payload.results],
          };
        } else {
          state.pokemons = action.payload;
        }
      }
    );
  },
});

export const pokemonsReducer = pokemonSlice.reducer;
