import * as React from "react";
import { Box, Autocomplete, Divider, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import MultiComplete from "@components/customMultiComplete";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../../hooks/hooksStore";
import {
  Race,
  AutocompleteItem,
  Feature,
} from "@pages/Characters/definitions/characterForm";
import { setRace as setRaceStore } from "reducers/characterReducer";
import CardInfo from "../components/cardInfo";

export default function RaceFrame() {
  const [size, setSize] = useState<string| null>(null);
  const raceStore = useAppSelector((state) => state.character.race);
  const dispatch = useAppDispatch();
  const [race, setRace] = useState<Race | null>(raceStore || null);
  const [isVisible, setVisibility] = React.useState(false);
  const [features,setFeatures] = React.useState<Feature[] | []>([]);
  const [languagesRes, setLanguages] = useState<AutocompleteItem[]>(
    race?.languages?.defaults || []
  );

  function handleChange(event: SelectChangeEvent) {
    setSize(event.target.value);
    console.log(event.target.value);
  }
  useEffect(() => {
    if (!race) return;
    race?.label !== "" ? setVisibility(true) : setVisibility(false);
    const a = race;
    setLanguages(a.languages?.defaults);
    setSize(a.sizeOptions?.[0] || null);
    setFeatures([{title: "Speed", text: `${a.speed} ft.`}, ...a.features]);
    dispatch(setRaceStore(a));
  }, [race, dispatch]);

  return (
    <Box>
      <Grid container>
        <Grid item lg={7} xs={12}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={races}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={race}
            sx={{ m: 2 }}
            onChange={(_, value) => {
              if (!value) return;
              setRace(value);
              setSize(null);
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
              <Divider sx={{ p: 2 }}>
                <Typography variant="overline" display="block" gutterBottom>
                  further information
                </Typography>
              </Divider>
            </Box>
            <Grid container sx={{ py: 2 }}>
              <Grid item lg={6} xs={12} sx={{ p: 2 }}>
                <MultiComplete
                  values={languages}
                  results={languagesRes}
                  onChange={setLanguages}
                  label="Languages"
                  helpText={`Please choose ${race?.languages.amount} languages`}
                  placeholder="elsiftisna"
                  maxItems={3}
                />
              </Grid>

              <Grid item lg={4} xs={12} sx={{ p: 2, pl: 7 }}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel id="demo-simple-select-label">Size</InputLabel>
                  <Select
                    id="demo-simple-select"
                    value={size || ""}
                    label="Size"
                    onChange={handleChange}
                  >
                    {(race?.sizeOptions?.map((option) => (
                      <MenuItem key={option} value={option} >
                        {option}
                      </MenuItem>
                    )))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <CardInfo
            title={race?.label || ""}  
            features={features}   
            description={race?.description || ""}           
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
      defaults: [
        { id: 5, title: "Common Dwarvish" },
      ],
    },
    description:
      "Bold and hardy, dwarves are known as skilled warriors, miners, and workers of stone and metal.",
    speed: 25,
    features: [
      {
          "title": "Darkvision",
          "text": "..."
      },
      {
          "title": "Dwarven Resilience",
          "text": "..."
      },
      {
          "title": "Dwarven Combat Training",
          "text": "As an action, you can touch a piece of nonmagical metal and imbue it with one of your smith’s specialties, as if you had cast the magic weapon spell on it. For the purpose of this trait, a martial weapon is a melee or ranged weapon that requires an Attack roll, and a ranged weapon is any weapon that can be used to make a ranged Attack."
      },
      {
          "title": "Tool Proficiency",
          "text": "..."
      },
      {
          "title": "Stonecunning",
          "text": "..."
      }
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
          "title": "Darkvision",
          "text": "..."
      },
      {
          "title": "Fey Ancestry",
          "text": "..."
      },
      {
          "title": "Skill Versatility",
          "text": "..."
      }
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
          "title": "Lucky",
          "text": "..."

      },
      {
          "title": "Brave",
          "text": "..."
      },
      {
          "title": "Halfling Nimbleness",
          "text": "..."
      }],
    abilityScorePlus2: ["DEXTERITY"],
    sizeOptions: ["Small"],
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

