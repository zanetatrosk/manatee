import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Character{
    race: string | null;
}
const initialState = {
    race: '',
} as Character
export const characterReducer = createSlice({
    name: 'character',
    initialState,
    reducers: {
        setRace (state, action: PayloadAction<string| null>) {
            state.race = action.payload;
        }
    }
});


export const { setRace } = characterReducer.actions

export default characterReducer.reducer;