import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Race } from "@pages/Characters/definitions/characterForm";
interface Character{
    name: string| null;
    race: Race | null;
}
const initialState = {
    race: null,
} as Character
export const characterReducer = createSlice({
    name: 'character',
    initialState,
    reducers: {
        setRace (state, action: PayloadAction<Race| null>) {
            state.race = action.payload;
        }
    }
});


export const { setRace } = characterReducer.actions

export default characterReducer.reducer;