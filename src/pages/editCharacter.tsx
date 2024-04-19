import Spinner from "@components/spinner";
import { CharacterSheet, SheetProficiencies } from "@definitions/characterSheet";
import { StepperForm, ToolsProficiency, LanguagesProficiency } from "@definitions/stepperForm";
import CreateCharacterStepper from "@features/characterStepper/characterStepper";
import { Card, CardContent } from "@mui/material";
import { useGetCharacterByIdQuery } from "api/charactersApiSlice";
import React from "react";
import { useParams } from "react-router-dom";

const fillDataForm = (character: CharacterSheet): StepperForm => {
	const form: StepperForm = {} as StepperForm;
	form.id = character.id;
	form.info = {
		characterName: character.info.characterName,
		playerName: character.info.playerName,
		sourceIds: character.sources.map((s) => s.id),
		cardPhotoUrl: character.info.cardPhotoUrl,
		sheetPhotoUrl: character.info.sheetPhotoUrl,
	};
	form.class = {
		id: character.info.class.id,
		subclass: character.info.subclass,
		toolIds: character.tools.filter((t: SheetProficiencies<ToolsProficiency>) => t.from === "class").map((t: SheetProficiencies<ToolsProficiency>) => t.item.id)
	}
	form.race = {
		id: character.info.race.id,
		size: character.info.size,
		languageIds: character.languages.filter((l: SheetProficiencies<LanguagesProficiency>) => l.from === "race").map((l: SheetProficiencies<LanguagesProficiency>) => l.item.id)
	}
	form.abilityScores = character.abilities;
	form.background = {
		id: character.info.background.id,
		toolIds: character.tools.filter((t: SheetProficiencies<ToolsProficiency>) => t.from === "background").map((t: SheetProficiencies<ToolsProficiency>) => t.item.id),
		languageIds: character.languages.filter((l: SheetProficiencies<LanguagesProficiency>) => l.from === "background").map((l: SheetProficiencies<LanguagesProficiency>) => l.item.id)
	}
	return form;

}
export default function EditCharacter() {
	const { id } = useParams();
	const { data: character, isLoading } = useGetCharacterByIdQuery(id!);
	const [form, setForm] = React.useState<StepperForm>();
	if (!isLoading) {
		if (character && !form) {
			setForm(fillDataForm(character));
		}
	}
	if( isLoading ) {
		return <Spinner/>
	} 
	return (
		<React.Fragment>
			<Card>
				<CardContent>
					<CreateCharacterStepper character={form} />
				</CardContent>
			</Card>
		</React.Fragment>
	);
}
