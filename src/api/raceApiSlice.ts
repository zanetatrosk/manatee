import { AutocompleteItem, Background, Class, Race, Source } from '@pages/CreateCharacter/definitions/characterForm';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const raceApiSlice = createApi({
    reducerPath: 'raceApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/' }),
    endpoints: (builder) => ({
        getRaces: builder.query<Race[], void>({
            query: () => 'races',
        }),
        getSources: builder.query<Source[], void>({
            query: () => 'sources',
        }),
        getClasses: builder.query<Class[], void>({
            query: () => 'classes',
        }),
        getBackgrounds: builder.query<Background[], void>({
            query: () => 'backgrounds',
        }),
        getLanguages: builder.query<AutocompleteItem[], void>({
            query: () => 'languages',
        }),
        getTools: builder.query<AutocompleteItem[], void>({
            query: () => 'tools',
        }),
        getSubclasses: builder.query<AutocompleteItem[], void>({
            query: () => 'subclasses',
        }),
        addCharacter: builder.mutation<void, void>({
            query: (body) => ({
                url: 'characters',
                method: 'POST',
                body,
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
    useGetSubclassesQuery,
 } = raceApiSlice;
