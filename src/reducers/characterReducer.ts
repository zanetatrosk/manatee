import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Race, Background } from "@pages/Characters/definitions/characterForm";
interface Character{
    name: string| null;
    race: Race | null;
    background: Background | null;
}
const initialState = {
    race: null,
    background: null,
} as Character
export const characterReducer = createSlice({
    name: 'character',
    initialState,
    reducers: {
        setRace (state, action: PayloadAction<Race| null>) {
            state.race = action.payload;
        },
        setBackground (state, action: PayloadAction<Background| null>){
            state.background = action.payload;
        }
    }
});


export const { setRace, setBackground } = characterReducer.actions

export default characterReducer.reducer;