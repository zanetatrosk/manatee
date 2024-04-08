import {
  Armor,
  AutocompleteItem,
  Background,
  Class,
  Pageable,
  Race,
  Source,
  Spell,
  Weapon,
} from "@pages/CreateCharacter/definitions/characterForm";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "process";

export interface PaginationParams {
  page: number;
  size: number;
  query: string;
}


export const generalContentApiSlice = createApi({
  reducerPath: "contentApi",
  baseQuery: fetchBaseQuery({ baseUrl: env.API_URL }),
  endpoints: (builder) => ({
    getRaces: builder.query<Race[], string[]>({
      query: (src) => ({
        url: "races",
        method: "GET",
        params: { source: src },
      }),
    }),
    getSources: builder.query<Source[], void>({
      query: () => "sources",
    }),
    getClasses: builder.query<Class[], string[]>({
      query: (src) => ({
        url: "classes",
        method: "GET",
        params: { source: src },
      }),
    }),
    getBackgrounds: builder.query<Background[], string[]>({
      query: (src) => ({
        url: "backgrounds",
        method: "GET",
        params: { source: src },
      }),
    }),
    getLanguages: builder.query<AutocompleteItem[], string[]>({
      query: (src) => ({
        url: "languages",
        method: "GET",
        params: { source: src },
      }),
    }),
    getTools: builder.query<AutocompleteItem[], string[]>({
      query: (src) => ({
        url: "tools",
        method: "GET",
        params: { source: src },
      }),
    }),
    getSpells: builder.query<Pageable<Spell>, PaginationParams>({
      query: (src) => ({
        url: "spells",
        method: "GET",
        params: { page: src.page, size: src.size, name: src.query },
      }),
    }),
    getArmor: builder.query<Pageable<Armor>, PaginationParams>({
      query: (src) => ({
        url: "armor",
        method: "GET",
        params: { page: src.page, size: src.size, name: src.query },
      }),
    }),
    getWeapons: builder.query<Pageable<Weapon>, PaginationParams>({
      query: (src) => ({
        url: "weapons",
        method: "GET",
        params: { page: src.page, size: src.size, name: src.query },
      }),
    }),
  }),
});

export const {
  useGetRacesQuery,
  useGetSourcesQuery,
  useGetClassesQuery,
  useGetBackgroundsQuery,
  useGetLanguagesQuery,
  useGetToolsQuery,
  useGetSpellsQuery,
  useGetArmorQuery,
  useGetWeaponsQuery,
} = generalContentApiSlice;
