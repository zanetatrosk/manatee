import {
  AutocompleteItem,
  Background,
  Class,
  Race,
  Source,
  Spell,
} from "@pages/CreateCharacter/definitions/characterForm";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface PaginationParams {
  page: number;
  size: number;
  query: string;
}

interface SpellParams {
  content: Spell[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
}
export const generalContentApiSlice = createApi({
  reducerPath: "raceApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/" }),
  endpoints: (builder) => ({
    getRaces: builder.query<Race[], string[]>({
      query: (src) => ({
        url: "/races",
        method: "GET",
        params: { source: src },
      }),
    }),
    getSources: builder.query<Source[], void>({
      query: () => "sources",
    }),
    getClasses: builder.query<Class[], string[]>({
      query: (src) => ({
        url: "/classes",
        method: "GET",
        params: { source: src },
      }),
    }),
    getBackgrounds: builder.query<Background[], string[]>({
      query: (src) => ({
        url: "/backgrounds",
        method: "GET",
        params: { source: src },
      }),
    }),
    getLanguages: builder.query<AutocompleteItem[], string[]>({
      query: (src) => ({
        url: "/languages",
        method: "GET",
        params: { source: src },
      }),
    }),
    getTools: builder.query<AutocompleteItem[], string[]>({
      query: (src) => ({
        url: "/tools",
        method: "GET",
        params: { source: src },
      }),
    }),
    getSpells: builder.query<SpellParams, PaginationParams>({
      query: (src) => ({
        url: "/spells",
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
} = generalContentApiSlice;
