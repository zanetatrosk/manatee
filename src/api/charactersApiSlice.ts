import { CharacterSheet, Spell, Attack, Armor, Skill, Proficient } from "@pages/CreateCharacter/definitions/characterSheet";
import { StepperForm } from "@pages/CreateCharacter/definitions/stepperForm";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const charactersApiSlice = createApi({
    reducerPath: 'charactersApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
    tagTypes: ['CharacterList', 'CharacterSheet'],
    endpoints: (builder) => ({
        getCharacters: builder.query<CharacterSheet[], void>({
            query: () => 'characters',
            providesTags: ['CharacterList'],
        }),
        getCharacterById: builder.query<CharacterSheet, string>({
            query: (id) => `characters/${id}`,
            providesTags: ['CharacterSheet'],
        }),
        postSpellsByCharacterId: builder.mutation<Spell[], { id: string, spells: string[] }>({
            query: ({ id, spells }) => ({
                url: `characters/${id}/spells`,
                method: 'PUT',
                body: spells,
            }),
            invalidatesTags: ['CharacterSheet'],
        }),
        postWeaponsByCharacterId: builder.mutation<Attack[], { id: string, weapons: string[] }>({
            query: ({ id, weapons }) => ({
                url: `characters/${id}/weapons`,
                method: 'PUT',
                body: weapons,
            }),
            invalidatesTags: ['CharacterSheet'],
        }),
        postArmorByCharacterId: builder.mutation<Armor, { id: string, armor: string }>({
            query: ({ id, armor }) => ({
                url: `characters/${id}/armor`,
                method: 'PUT',
                body: { id: armor },
            }),
            invalidatesTags: ['CharacterSheet'],
        }),
        postSkillsByCharacterId: builder.mutation<Skill[], { id: string, skills: Proficient[] }>({
            query: ({ id, skills }) => ({
                url: `characters/${id}/skills`,
                method: 'PUT',
                body: skills,
            }),
            invalidatesTags: ['CharacterSheet'],
        }),
        postLevelUpByCharacterId: builder.mutation<CharacterSheet, { id: string }>({
            query: ({ id }) => ({
                url: `characters/${id}/levelup`,
                method: 'POST',
            }),
            invalidatesTags: ['CharacterSheet'],
        }),
        putCharacter: builder.mutation<CharacterSheet, StepperForm>({
            query: (body) => ({
                url: `characters/${body.id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['CharacterSheet', 'CharacterList'],
        }),
        addCharacter: builder.mutation<CharacterSheet, StepperForm>({
            query: (body) => ({
                url: 'characters',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['CharacterList'],
        }),
        deleteCharacter: builder.mutation<void, string>({
            query: (id) => ({
                url: `characters/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['CharacterList'],
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
    usePutCharacterMutation
    } = charactersApiSlice;