import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CharacterSheet, characterSheetDefaults } from "@pages/CreateCharacter/definitions/characterForm";

const initialState = characterSheetDefaults;
export const characterReducer = createSlice({
    name: 'character',
    initialState,
    reducers: {
        setCharacterSheet: (_, action: PayloadAction<CharacterSheet>) => {
            return action.payload;
        },
        resetState (){
            return characterSheetDefaults;
        }
    }
});


export const { setCharacterSheet, resetState } = characterReducer.actions;
export default characterReducer.reducer;