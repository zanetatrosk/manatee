import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Race, Background, AbilityScore } from "@pages/Characters/definitions/characterForm";
interface Character{
    name: string| null;
    race: Race | null;
    background: Background | null;
    abilityScores: AbilityScore[] | [];
}
const initialState = {
    race: null,
    background: null,
    abilityScores: [],
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
        },
        setAbilityScores (state, action: PayloadAction<AbilityScore[]| []>){
            state.abilityScores = action.payload;
        }
        
    }
});


export const { setRace, setBackground, setAbilityScores } = characterReducer.actions

export default characterReducer.reducer;