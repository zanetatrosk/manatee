import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Race, Background, AbilityScore, BasicInfo, createForm } from "@pages/CreateCharacter/definitions/characterForm";

const initialState = createForm();
export const characterReducer = createSlice({
    name: 'character',
    initialState,
    reducers: {
        setRace (state, action: PayloadAction<Race>) {
            state.race = action.payload;
        },
        setBackground (state, action: PayloadAction<Background>){
            state.background = action.payload;
        },
        setAbilityScores (state, action: PayloadAction<AbilityScore[]>){
            state.abilityScores = action.payload;
        },
        setBasicInfo (state, action: PayloadAction<BasicInfo>){
            state.basicInfo = action.payload;
        }
    }
});


export const { setRace, setBackground, setAbilityScores, setBasicInfo } = characterReducer.actions

export default characterReducer.reducer;