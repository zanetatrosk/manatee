import { CharacterSheet } from "@pages/CreateCharacter/definitions/characterForm";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Character {
    race: {
        name: string;
        id: string;
      },
      characterClass: {
        name: string;
        id: string;
        subclass?: string;
      },
      background: {
        name: string;
        id: string;
      },
      characterName: string;
      playerName: string;
      cardPhotoUrl: string;
      sheetPhotoUrl: string;
      id: string;
      level: number;
      //----------------
      sources?: string[];
      languageProficiencies?: string[];
      toolProficiencies?: string[];
}

export const charactersApiSlice = createApi({
    reducerPath: 'charactersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/' }),
    endpoints: (builder) => ({
        getCharacters: builder.query<Character[], void>({
        query: () => 'characters',
        }),
        getCharacterById: builder.query<CharacterSheet, string>({
        query: (id) => `characters/${id}`,
        }),
        addCharacter: builder.mutation<void, Character>({
        query: (body) => ({
            url: 'characters',
            method: 'POST',
            body,
        }),
        }),
        deleteCharacter: builder.mutation<void, number>({
        query: (id) => ({
            url: `characters/${id}`,
            method: 'DELETE',
        }),
        }),
    }),
    });
    export const { useGetCharactersQuery, useGetCharacterByIdQuery } = charactersApiSlice;