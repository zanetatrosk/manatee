import * as React from "react";
import { Box, Autocomplete, Divider, Grid, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import MultiComplete from "@components/customMultiComplete";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@hooks/hooksStore";
import {
  Race,
  AutocompleteItem,
  Feature,
  AbilityScore,
  Ability,
} from "@pages/Characters/definitions/characterForm";
import {
  setAbilityScores,
  setRace as setRaceStore,
} from "reducers/characterReducer";
import CardInfo from "./cardInfo";
import createAbilityData from "utils/abilityUtils";
import { useGetAllRacesQuery } from "api/raceApiSlice";

export default function RaceFrame() {
  const raceStore = useAppSelector((state) => state.character.race);
  const dispatch = useAppDispatch();

  //calling api to get all races, in future this will be called when create character button is clicked
  const racesApi = useGetAllRacesQuery();

  const [size, setSize] = useState<string>("");
  const [race, setRace] = useState<Race>(raceStore);
  const [isVisible, setVisibility] = React.useState(false);
  //these are the values that are going to be displayed in the multicomplete
  //that are selected by user or by default according to race
  const [features, setFeatures] = React.useState<Feature[]>(raceStore.features);
  const [languagesRes, setLanguages] = useState<AutocompleteItem[]>(raceStore.languages.defaults);
  
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
  
  function handleChange(event: SelectChangeEvent) {
    setSize(event.target.value);
    console.log(event.target.value);
  }

  return (
    <Box>
      <Grid container direction="column" pb={2}>
        <Grid item>
          <Typography gutterBottom variant="h4" component="div">
            Race
          </Typography>
        </Grid>
        <Grid item>
          { !isVisible && 
          (<Typography gutterBottom variant="body2" color="text.secondary">
            {/* todo implement point buy */}
            Choose your race and you will get some features and languages
          </Typography>)}
          
        </Grid>
      </Grid>
      <Grid container>
        <Grid item lg={7} xs={12}>
          <Autocomplete
            sx={{ my: 2 }}
            freeSolo
            clearOnBlur
            id="combo-box-demo"
            options={races}
            isOptionEqualToValue={(option, value) => option.id === value.id }
            value={race}
            onChange={(_, value) => {
              //the typeof value === "string" is caused by the freeSolo option
              if (!value || typeof value === "string") return;
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
                label="Race"
                variant="filled"
                placeholder="Human"
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
                  further information
                </Typography>
              </Divider>
            </Box>
            <Grid container sx={{ py: 2 }}>
              <Grid item lg={6} xs={12} sx={{ py: 2 }}>
                <MultiComplete
                  values={languages}
                  results={languagesRes}
                  onChange={setLanguages}
                  label="Languages"
                  helpText={`Please choose ${race.languages.amount} languages`}
                  placeholder="elsiftisna"
                  maxItems={race.languages.amount}
                />
              </Grid>

              <Grid item lg={4} xs={12} sx={{ py: 2, pl: 7 }}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel id="demo-simple-select-label">Size</InputLabel>
                  <Select
                    id="demo-simple-select"
                    value={size}
                    label="Size"
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
//generate races from D&D as in interface
const races: Race[] = [
  {
    id: 1,
    label: "Dwarf",
    languages: {
      amount: 2,
      defaults: [{ id: 5, title: "Common Dwarvish" }],
    },
    description:
      "Bold and hardy, dwarves are known as skilled warriors, miners, and workers of stone and metal.",
    speed: 25,
    features: [
      {
        title: "Darkvision",
        text: "As an action, you touch a stone object no larger than 3 feet in any dimension and imbue it with magic. For the duration, the object sheds bright light in a 20-foot radius and dim light for an additional 20 feet. If you chose a sphere, the radius is doubled. Once used, this trait can’t be used again until you finish a long rest.",
      },
      {
        title: "Dwarven Resilience",
        text: "The hit point maximum of a dwarf is increased by 1, and it increases by 1 every time the dwarf gains a level.",
      },
      {
        title: "Dwarven Combat Training",
        text: "As an action, you can touch a piece of nonmagical metal and imbue it with one of your smith’s specialties, as if you had cast the magic weapon spell on it. For the purpose of this trait, a martial weapon is a melee or ranged weapon that requires an Attack roll, and a ranged weapon is any weapon that can be used to make a ranged Attack.",
      },
      {
        title: "Tool Proficiency",
        text: "This trait grants you proficiency with the artisan’s tools of your choice: smith’s tools, brewer’s supplies, or mason’s tools.",
      },
      {
        title: "Stonecunning",
        text: "The dwarf has advantage on Intelligence (History) checks related to the origin of stonework, and it can make such checks untrained.",
      },
    ],
    abilityScorePlus2: ["CONSTITUTION"],
    sizeOptions: ["Medium"],
  },
  {
    id: 2,
    label: "Elf",
    languages: {
      amount: 2,
      defaults: [
        { id: 1, title: "Common Elvish" },
        { id: 2, title: "High Elvish" },
      ],
    },
    description:
      "Elves are a magical people of otherworldly grace, living in the world but not entirely part of it.",
    speed: 30,
    features: [
      {
        title: "Darkvision",
        text: "...",
      },
      {
        title: "Fey Ancestry",
        text: "The elf has advantage on saving throws against being charmed, and magic can’t put the elf to sleep.",
      },
      {
        title: "Skill Versatility",
        text: "...",
      },
    ],
    abilityScorePlus2: ["DEXTERITY"],
    sizeOptions: ["Medium"],
  },
  {
    id: 3,
    label: "Halfling",
    languages: {
      amount: 2,
      defaults: [
        { id: 8, title: "Common Draconic" },
        { id: 9, title: "High Draconic" },
      ],
    },
    description:
      "The diminutive halflings survive in a world full of larger creatures by avoiding notice or, barring that, avoiding offense.",
    speed: 25,
    features: [
      {
        title: "Lucky",
        text: "...",
      },
      {
        title: "Brave",
        text: "...",
      },
      {
        title: "Halfling Nimbleness",
        text: "...",
      },
    ],
    abilityScorePlus2: ["DEXTERITY"],
    sizeOptions: ["Small"],
  },
  {
    id: 4,
    label: "Human",
    languages: {
      amount: 1,
      defaults: [{ id: 1, title: "Common Elvish" }],
    },
    description: "The Human is ",
    speed: 30,
    features: [],
    abilityScorePlus2: [],
    sizeOptions: ["Medium"],
  },
];

// TypeScript array of objects with hardcoded IDs representing D&D languages

const languages: AutocompleteItem[] = [
  // Elvish languages
  { id: 1, title: "Common Elvish" },
  { id: 2, title: "High Elvish" },
  { id: 3, title: "Wood Elvish" },
  { id: 4, title: "Drow Sign Language" },

  // Dwarvish languages
  { id: 5, title: "Common Dwarvish" },
  { id: 6, title: "Hill Dwarvish" },
  { id: 7, title: "Mountain Dwarvish" },

  // Draconic languages
  { id: 8, title: "Common Draconic" },
  { id: 9, title: "High Draconic" },
  { id: 10, title: "Ancient Draconic" },

  // Gnomish languages
  { id: 11, title: "Common Gnomish" },
  { id: 12, title: "Rock Gnomish" },
  { id: 13, title: "Forest Gnomish" },

  // Orcish languages
  { id: 14, title: "Common Orcish" },
  { id: 15, title: "Black Orcish" },
  { id: 16, title: "Gray Orcish" },

  // Celestial languages
  { id: 17, title: "Common Celestial" },
  { id: 18, title: "High Celestial" },

  // Infernal languages
  { id: 19, title: "Common Infernal" },
  { id: 20, title: "High Infernal" },

  // Abyssal languages
  { id: 21, title: "Common Abyssal" },
  { id: 22, title: "High Abyssal" },

  // Giant languages
  { id: 23, title: "Common Giant" },
  { id: 24, title: "Hill Giant" },
  { id: 25, title: "Stone Giant" },

  // Undercommon languages
  { id: 26, title: "Common Undercommon" },
  { id: 27, title: "High Undercommon" },
];
