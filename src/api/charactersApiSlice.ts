import {
  CharacterSheet,
  Spell,
  Attack,
  Armor,
  Skill,
  Proficient,
} from "@definitions/characterSheet";
import { StepperForm } from "@definitions/stepperForm";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const charactersApiSlice = createApi({
  reducerPath: "charactersApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.REACT_APP_API_URL + "characters" 
  }),
  tagTypes: ["CharacterList", "CharacterSheet"],
  endpoints: (builder) => ({
    getCharacters: builder.query<CharacterSheet[], void>({
      query: () => "",
      providesTags: ["CharacterList"],
    }),
    getCharacterById: builder.query<CharacterSheet, string>({
      query: (id) => `/${id}`,
      providesTags: ["CharacterSheet"],
    }),
    putCharacter: builder.mutation<CharacterSheet, StepperForm>({
      query: (body) => ({
        url: `/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["CharacterSheet", "CharacterList"],
    }),
    addCharacter: builder.mutation<CharacterSheet, StepperForm>({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: ["CharacterList"],
    }),
    deleteCharacter: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        responseHandler: "text",
      }),
      invalidatesTags: ["CharacterList"],
    }),
    postSpellsByCharacterId: builder.mutation<
      Spell[],
      { id: string; spells: string[] }
    >({
      query: ({ id, spells }) => ({
        url: `/${id}/spells`,
        method: "PUT",
        body: spells,
      }),
      invalidatesTags: ["CharacterSheet"],
    }),
    postWeaponsByCharacterId: builder.mutation<
      Attack[],
      { id: string; weapons: string[] }
    >({
      query: ({ id, weapons }) => ({
        url: `/${id}/weapons`,
        method: "PUT",
        body: weapons,
      }),
      invalidatesTags: ["CharacterSheet"],
    }),
    postArmorByCharacterId: builder.mutation<
      Armor,
      { id: string; armor: string }
    >({
      query: ({ id, armor }) => ({
        url: `/${id}/armor`,
        method: "PUT",
        body: { id: armor },
      }),
      invalidatesTags: ["CharacterSheet"],
    }),
    postSkillsByCharacterId: builder.mutation<
      Skill[],
      { id: string; skills: Proficient[] }
    >({
      query: ({ id, skills }) => ({
        url: `/${id}/skills`,
        method: "PUT",
        body: skills,
      }),
      invalidatesTags: ["CharacterSheet"],
    }),
    postLevelUpByCharacterId: builder.mutation<CharacterSheet, { id: string }>({
      query: ({ id }) => ({
        url: `/${id}/levelup`,
        method: "POST",
      }),
      invalidatesTags: ["CharacterSheet"],
    }),
    
  }),
});
export const {
  useGetCharactersQuery,
  useGetCharacterByIdQuery,
  usePostSpellsByCharacterIdMutation,
  usePostWeaponsByCharacterIdMutation,
  usePostArmorByCharacterIdMutation,
  usePostSkillsByCharacterIdMutation,
  useAddCharacterMutation,
  useDeleteCharacterMutation,
  usePostLevelUpByCharacterIdMutation,
  usePutCharacterMutation,
} = charactersApiSlice;
