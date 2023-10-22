import { Race } from '@pages/Characters/definitions/characterForm';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const raceApiSlice = createApi({
    reducerPath: 'raceApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
    endpoints: (builder) => ({
        getAllRaces: builder.query<Race[], void>({
            query: () => 'races',
        }),
    }),
});

export const { useGetAllRacesQuery } = raceApiSlice;
