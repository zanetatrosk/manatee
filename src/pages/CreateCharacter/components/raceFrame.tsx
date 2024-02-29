import * as React from "react";
import {
  Box,
  Autocomplete,
  Divider,
  Grid,
  CircularProgress,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import MultiComplete from "@components/customMultiComplete";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@hooks/hooksStore";
import { CREATE_CHARACTER } from "constants/characterDefinition";
import {
  Race,
  AutocompleteItem,
  Source,
} from "@pages/CreateCharacter/definitions/characterForm";
import CardInfo from "./cardInfo";
import { useGetLanguagesQuery, useGetRacesQuery } from "api/generalContentApiSlice";
import { RaceForm, StepperForm } from "../definitions/stepperForm";

const RACE = CREATE_CHARACTER.RACE;

export default function RaceFrame({
  raceForm,
  setForm,
}: {
  raceForm: RaceForm;
  setForm: React.Dispatch<React.SetStateAction<StepperForm>>;
}) {
  //calling api to get all races, in future this will be called when create character button is clicked

  const { data: races, isLoading: loadingRaces } = useGetRacesQuery([]);
  const { data: languages, isLoading: loadingLanguages } = useGetLanguagesQuery([]);

  const getRace = (id: string | null) => {
    setVisibility(true);
    return races?.find((r) => r.id === id);
  };

  const [race, setRace] = useState<Race|null>(null);
  const [isVisible, setVisibility] = React.useState(!!race);
  if( !race && races && raceForm.id) {
    setRace(getRace(raceForm.id) || null);
    setVisibility(true);
  }
  //these are the values that are going to be displayed in the multicomplete
  //that are selected by user or by default according to race
  const setPropertyInForm = (property: string, value: any) => {
    setForm(prev => ({...prev, race: {...prev.race, [property]: value}}));
  }
  const handleLanguagesChange = (value: AutocompleteItem[]): void => {
    setPropertyInForm(
      "languageIds",
      value.map((v) => v.id)
    );
  };


  return (
    <Box>
      <Grid container direction="column" pb={2}>
        <Grid item>
          <Typography gutterBottom variant="h4" component="div">
            {RACE.HEADING}
          </Typography>
        </Grid>
        <Grid item>
          {!isVisible && (
            <Typography gutterBottom variant="body2" color="text.secondary">
              {/* todo implement point buy */}
              {RACE.SUBTITLE}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item lg={7} xs={12}>
          <Autocomplete
            sx={{ my: 2 }}
            clearOnBlur
            data-cy="race"
            options={races || []}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={race?.id ? race : null}
            onChange={(_, value) => {
              if (!value) return;
              setVisibility(true);
              //setting the right properties of race
              //recalculate ability scores acording to a new race
              setPropertyInForm("id", value.id);
              setPropertyInForm("size", value.sizeOptions[0]);
              setPropertyInForm("languageIds", value.languageProficiencies.defaults.map(l => l.id));
              setRace(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={RACE.HEADING}
                variant="filled"
                placeholder={RACE.PLACEHOLDER}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loadingRaces ? (
                        <CircularProgress color="inherit" size={23} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        </Grid>
      </Grid>
      <React.Fragment>
        {isVisible && !!race && (
          <div>
            <Box>
              <Divider sx={{ py: 2 }}>
                <Typography variant="overline" display="block" gutterBottom>
                  {CREATE_CHARACTER.CARD_ACTIONS.FURTHER_INFO}
                </Typography>
              </Divider>
            </Box>
            <Grid container sx={{ py: 2 }}>
              <Grid item lg={6} xs={12} sx={{ py: 2 }}>
                <MultiComplete
                  values={languages || []}
                  data_cy="languages"
                  results={languages?.filter((l) => raceForm.languageIds.includes(l.id)) || []}
                  onChange={handleLanguagesChange}
                  label={RACE.LANGUAGES}
                  helpText={`You can have up to ${race.languageProficiencies.amount} languages`}
                  placeholder={RACE.LANGUAGES_PLACEHOLDER}
                  maxItems={race.languageProficiencies.amount}
                />
              </Grid>

              <Grid item lg={4} xs={12} sx={{ py: 2, pl: 7 }}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel data-cy="size">Size</InputLabel>
                  <Select
                    value={raceForm.size}
                    label={RACE.SIZE}
                    onChange={(e: SelectChangeEvent) => {
                      setPropertyInForm("size", e.target.value);
                    }}
                  >
                    {race.sizeOptions?.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <CardInfo
              title={race.name}
              features={[{ title: "Speed", text: race.speed.toString() + " ft", levelMinimum: 1}, ...race.features ]}
              description={race.description}
            />
          </div>
        )}
      </React.Fragment>
    </Box>
  );
}
