import { Armor, Attack, CharacterSheet, Proficient, Skill, Spell, Weapon } from "@pages/CreateCharacter/definitions/characterForm";
import { StepperForm } from "@pages/CreateCharacter/definitions/stepperForm";
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
        postSpellsByCharacterId: builder.mutation<Spell[], { id: string, spells: string[] }>({
            query: ({ id, spells }) => ({
                url: `characters/${id}/spells`,
                method: 'PUT',
                body: spells,
            }),
        }),
        postWeaponsByCharacterId: builder.mutation<Attack[], { id: string, weapons: string[] }>({
            query: ({ id, weapons }) => ({
                url: `characters/${id}/weapons`,
                method: 'PUT',
                body: weapons,
            }),
        }),
        postArmorByCharacterId: builder.mutation<Armor, { id: string, armor: string }>({
            query: ({ id, armor }) => ({
                url: `characters/${id}/armor`,
                method: 'PUT',
                body: { id: armor },
            }),
        }),
        postSkillsByCharacterId: builder.mutation<Skill[], { id: string, skills: Proficient[] }>({
            query: ({ id, skills }) => ({
                url: `characters/${id}/skills`,
                method: 'PUT',
                body: skills,
            }),
        }),
        addCharacter: builder.mutation<CharacterSheet, StepperForm>({
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
export const {
    useGetCharactersQuery,
    useGetCharacterByIdQuery, 
    usePostSpellsByCharacterIdMutation, 
    usePostWeaponsByCharacterIdMutation, 
    usePostArmorByCharacterIdMutation, 
    usePostSkillsByCharacterIdMutation, 
    useAddCharacterMutation,
    } = charactersApiSlice;