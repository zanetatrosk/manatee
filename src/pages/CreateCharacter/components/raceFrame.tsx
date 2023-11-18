import * as React from "react";
import { Box, Autocomplete, Divider, Grid, CircularProgress } from "@mui/material";
import Typography from "@mui/material/Typography";
import MultiComplete from "@components/customMultiComplete";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@hooks/hooksStore";
import {CREATE_CHARACTER} from "constants/characterDefinition";
import {
  Race,
  AutocompleteItem,
  Feature,
} from "@pages/CreateCharacter/definitions/characterForm";
import {
  setAbilityScores,
  setRace as setRaceStore,
} from "reducers/characterReducer";
import CardInfo from "./cardInfo";
import createAbilityData from "utils/abilityUtils";
import { useGetLanguagesQuery, useGetRacesQuery } from "api/raceApiSlice";

const RACE = CREATE_CHARACTER.RACE;

export default function RaceFrame() {
  const raceStore = useAppSelector((state) => state.character.race);
  const dispatch = useAppDispatch();

  //calling api to get all races, in future this will be called when create character button is clicked
  

  const [size, setSize] = useState<string>("");
  const [race, setRace] = useState<Race>(raceStore);
  const [isVisible, setVisibility] = React.useState(false);
  //these are the values that are going to be displayed in the multicomplete
  //that are selected by user or by default according to race
  const [features, setFeatures] = React.useState<Feature[]>(raceStore.features);
  const [languagesRes, setLanguages] = useState<AutocompleteItem[]>(raceStore.languages.defaults);
  
  const { data: races, isLoading: loadingRaces } = useGetRacesQuery();
  const { data: languages, isLoading: loadingLanguages } = useGetLanguagesQuery();

  function handleChange(event: SelectChangeEvent) {
    setSize(event.target.value);
    console.log(event.target.value);
  }

  const handleLanguagesChange = (value: AutocompleteItem[]): void => {
    setLanguages(value);
  }

  useEffect(() => {
    if ( !race.id || race.label === "") return;
    const a = race;
    setVisibility(true);
    //setting the right properties of race
    setLanguages(a.languages.defaults);
    setSize(a.sizeOptions?.[0] || "");
    setFeatures([{ title: "Speed", text: `${a.speed} ft.` }, ...a.features]);
    //recalculate ability scores acording to a new race
    const abilities = createAbilityData(a);

    dispatch(setRaceStore(a));
    dispatch(setAbilityScores(abilities));
  }, [race, dispatch]);
  
  

  return (
    <Box>
      <Grid container direction="column" pb={2}>
        <Grid item>
          <Typography gutterBottom variant="h4" component="div">
            {RACE.HEADING}
          </Typography>
        </Grid>
        <Grid item>
          { !isVisible && 
          (<Typography gutterBottom variant="body2" color="text.secondary">
            {/* todo implement point buy */}
            {RACE.SUBTITLE}
          </Typography>)}
          
        </Grid>
      </Grid>
      <Grid container>
        <Grid item lg={7} xs={12}>
          <Autocomplete
            sx={{ my: 2 }}
            clearOnBlur
            id="combo-box-demo"
            options={races || [] }
            isOptionEqualToValue={(option, value) => option.id === value.id }
            value={race.id ? race : null}
            onChange={(_, value) => {
              if (!value) return;
              setRace(value);
              // if this is not set, I get following error:
              /*
              You have provided an out-of-range value `Medium` for the select component.
              Consider providing a value that matches one of the available options or ''.
              The available values are `Small`.
              */
             //I do not understand why this is happening
              setSize("");
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={RACE.HEADING}
                variant="filled"
                placeholder={ RACE.PLACEHOLDER}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loadingRaces? <CircularProgress color="inherit" size={23} /> : null }
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
        {isVisible && (
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
                  results={languagesRes}
                  onChange={handleLanguagesChange}
                  label={RACE.LANGUAGES}
                  helpText={`Please choose ${race.languages.amount} languages`}
                  placeholder={RACE.LANGUAGES_PLACEHOLDER}
                  maxItems={race.languages.amount}
                />
              </Grid>

              <Grid item lg={4} xs={12} sx={{ py: 2, pl: 7 }}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel id="demo-simple-select-label">Size</InputLabel>
                  <Select
                    id="demo-simple-select"
                    value={size}
                    label={RACE.SIZE}
                    onChange={handleChange}
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
              title={race.label}
              features={features}
              description={race.description}
            />
          </div>
        )}
      </React.Fragment>
    </Box>
  );
}

