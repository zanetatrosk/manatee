import { CharacterSheet } from "@pages/CreateCharacter/definitions/characterForm";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const charactersApiSlice = createApi({
    reducerPath: 'charactersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/' }),
    endpoints: (builder) => ({
        getCharacters: builder.query<CharacterSheet[], void>({
        query: () => 'characters',
        }),
        getCharacterById: builder.query<CharacterSheet, string>({
        query: (id) => `characters/${id}`,
        }),
        addCharacter: builder.mutation<void, CharacterSheet>({
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