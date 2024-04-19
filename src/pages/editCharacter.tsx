import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CreateCharacterStepper from "../features/characterStepper/characterStepper";
import React from "react";
import { useGetCharacterByIdQuery } from "api/charactersApiSlice";
import { StepperForm, ToolsProficiency, LanguagesProficiency } from "../definitions/stepperForm";
import { useParams } from "react-router-dom";
import Spinner from "@components/spinner";
import { CharacterSheet, ProficienciesSheet } from "../definitions/characterSheet";

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
		toolIds: character.tools.filter((t: ProficienciesSheet<ToolsProficiency>) => t.from === "class").map((t: ProficienciesSheet<ToolsProficiency>) => t.item.id)
	}
	form.race = {
		id: character.info.race.id,
		size: character.info.size,
		languageIds: character.languages.filter((l: ProficienciesSheet<LanguagesProficiency>) => l.from === "race").map((l: ProficienciesSheet<LanguagesProficiency>) => l.item.id)
	}
	form.abilityScores = character.abilities;
	form.background = {
		id: character.info.background.id,
		toolIds: character.tools.filter((t: ProficienciesSheet<ToolsProficiency>) => t.from === "background").map((t: ProficienciesSheet<ToolsProficiency>) => t.item.id),
		languageIds: character.languages.filter((l: ProficienciesSheet<LanguagesProficiency>) => l.from === "background").map((l: ProficienciesSheet<LanguagesProficiency>) => l.item.id)
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
