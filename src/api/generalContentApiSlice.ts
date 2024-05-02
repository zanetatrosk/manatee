import {
  Race,
  Source,
  Class,
  Background,
  BaseItem,
  Sourceable,
} from "@definitions/characterForm";
import { Pageable, Spell, Armor, Weapon } from "@definitions/characterSheet";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface PaginationParams {
  page: number;
  size: number;
  query: string;
  source?: string[];
}

export const generalContentApiSlice = createApi({
  reducerPath: "contentApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getRaces: builder.query<Pageable<Race>, string[]>({
      query: (src) => ({
        url: "races",
        method: "GET",
        params: { source: src },
      }),
    }),
    getSources: builder.query<Source[], void>({
      query: () => "sources",
    }),
    getClasses: builder.query<Pageable<Class>, string[]>({
      query: (src) => ({
        url: "classes",
        method: "GET",
        params: { source: src },
      }),
    }),
    getBackgrounds: builder.query<Pageable<Background>, string[]>({
      query: (src) => ({
        url: "backgrounds",
        method: "GET",
        params: { source: src },
      }),
    }),
    getLanguages: builder.query<Pageable<Sourceable>, string[]>({
      query: (src) => ({
        url: "languages",
        method: "GET",
        params: { source: src },
      }),
    }),
    getTools: builder.query<Pageable<Sourceable>, string[]>({
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
        params: {
          page: src.page,
          size: src.size,
          name: src.query,
          source: src.source,
        },
      }),
    }),
    getArmor: builder.query<Pageable<Armor>, PaginationParams>({
      query: (src) => ({
        url: "armor",
        method: "GET",
        params: {
          page: src.page,
          size: src.size,
          name: src.query,
          source: src.source,
        },
      }),
    }),
    getWeapons: builder.query<Pageable<Weapon>, PaginationParams>({
      query: (src) => ({
        url: "weapons",
        method: "GET",
        params: {
          page: src.page,
          size: src.size,
          name: src.query,
          source: src.source,
        },
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
