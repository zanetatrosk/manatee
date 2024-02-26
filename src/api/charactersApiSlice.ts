import { CharacterSheet, Spell, Weapon } from "@pages/CreateCharacter/definitions/characterForm";
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
        postSpellsByCharacterId: builder.mutation<Spell[], {id: string, spells: string[]}>({
        query: ({id, spells}) => ({
            url: `characters/${id}/spells`,
            method: 'PUT',
            body: spells,
        }),
        }),
        postWeaponsByCharacterId: builder.mutation<Weapon[], {id: string, weapons: string[]}>({
        query: ({id, weapons}) => ({
            url: `characters/${id}/weapons`,
            method: 'PUT',
            body: weapons,
        }),
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
    export const { useGetCharactersQuery, useGetCharacterByIdQuery, usePostSpellsByCharacterIdMutation, usePostWeaponsByCharacterIdMutation } = charactersApiSlice;