import Spinner from "@components/spinner";
import {
  CharacterSheet,
  SheetProficiencies,
} from "@definitions/characterSheet";
import {
  StepperForm,
  ToolsProficiency,
  LanguagesProficiency,
} from "@definitions/stepperForm";
import CreateCharacterStepper from "@features/characterStepper/characterStepper";
import { Card, CardContent } from "@mui/material";
import { useGetCharacterByIdQuery } from "api/charactersApiSlice";
import React from "react";
import { useParams } from "react-router-dom";

const fillDataForm = (character: CharacterSheet): StepperForm => {
  const { id, info, sources, tools, languages, abilities } = character;
  const {
    characterName,
    playerName,
    cardPhotoUrl,
    sheetPhotoUrl,
    class: classInfo,
    race,
    size,
    background,
    subclass,
  } = info;

  const filterBySource =
    (source: string) =>
    (item: SheetProficiencies<ToolsProficiency | LanguagesProficiency>) =>
      item.from === source;
  const mapToId = (
    item: SheetProficiencies<ToolsProficiency | LanguagesProficiency>,
  ) => item.item.id;

  const form: StepperForm = {
    id,
    info: {
      characterName,
      playerName,
      sourceIds: sources.map((s) => s.id),
      cardPhotoUrl,
      sheetPhotoUrl,
    },
    class: {
      id: classInfo.id,
      subclass: subclass,
      toolIds: tools.filter(filterBySource("class")).map(mapToId),
    },
    race: {
      id: race.id,
      size,
      languageIds: languages.filter(filterBySource("race")).map(mapToId),
    },
    abilityScores: abilities,
    background: {
      id: background.id,
      toolIds: tools.filter(filterBySource("background")).map(mapToId),
      languageIds: languages.filter(filterBySource("background")).map(mapToId),
    },
  };
  return form;
};
export default function EditCharacter() {
  const { id } = useParams();
  const { data: character, isLoading } = useGetCharacterByIdQuery(id!);
  const [form, setForm] = React.useState<StepperForm>();
  if (!isLoading) {
    if (character && !form) {
      setForm(fillDataForm(character));
    }
  }
  if (isLoading) {
    return <Spinner />;
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
