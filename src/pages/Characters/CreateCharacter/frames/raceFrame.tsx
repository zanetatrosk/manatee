import * as React from "react";
import { Box, Autocomplete, Divider, Grid } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MultiComplete from "@components/customMultiComplete";
import Card from "@mui/material/Card";
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
} from "@pages/Characters/definitions/characterForm";

const sizes = [
  {
    value: "M",
    label: "Medium",
  },
  {
    value: "S",
    label: "Small",
  },
];

export default function RaceFrame() {
  const [size, setSize] = useState("M");
  const raceChange: Race = {
    id: 44,
    label: useAppSelector((state) => state.character.race),
    languages: [],
  };
  const [race, setRace] = useState<Race | null>(raceChange);
  const [isVisible, setVisibility] = React.useState(false);
  const [languagesRes, setLanguages] = useState<AutocompleteItem[]>(
    languages.filter((option) => race?.languages.find((id) => id === option.id))
  );
  function handleChange(event: SelectChangeEvent) {
    setSize(event.target.value);
  }
  useEffect(() => {
    race?.label !== "" ? setVisibility(true) : setVisibility(false);
    const a = race?.label;
    dispatch({ type: "character/setRace", payload: a });
    const resLen = languages.filter((option) => {
      const result = race?.languages.find(
        (id) => id === option.id
      );
      return result;
    })
    setLanguages(resLen);
  }, [race]);
  const dispatch = useAppDispatch();
  return (
    <Box sx={{ pt: 2, pb: 3 }}>
      <Grid container sx={{ py: 2 }}>
        <Grid item lg={7} xs={12}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={races}
            value={race}
            sx={{ m: 2 }}
            onChange={(_, value) => {
              if (!value) return;
              setRace(value);
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
                  helpText="Please choose 3 languages"
                  placeholder="elsiftisna"
                  maxItems={3}
                />
              </Grid>

              <Grid item lg={4} xs={12} sx={{ p: 2, pl: 7 }}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel id="demo-simple-select-label">Size</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={size}
                    label="Size"
                    defaultValue={size}
                    onChange={handleChange}
                  >
                    {sizes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Box display="flex" flexGrow={1}>
              <Card
                sx={{
                  display: "flex",
                  m: 2,
                  p: 1,
                  justifyContent: "flex-start",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ display: "flex", pb: 0 }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    align="left"
                  >
                    High Elf
                  </Typography>
                </CardContent>
                <CardContent
                  sx={{
                    display: "flex",
                    py: 0,
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="body1"
                    component="div"
                    align="left"
                    sx={{ pr: 1 }}
                  >
                    Speed:
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    align="justify"
                  >
                    20 km/h
                  </Typography>
                </CardContent>
                <CardContent
                  sx={{
                    display: "flex",
                  }}
                >
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    align="justify"
                  >
                    As a high elf, you have a keen mind and a mastery of at
                    least the basics of magic. In many of the worlds of D&D,
                    there are two kinds of high elves. One type (which includes
                    the gray elves and valley elves of Greyhawk, the Silvanesti
                    of Dragonlance, and the sun elves of the Forgotten Realms)
                    is haughty and reclusive, believing themselves to be
                    superior to non-elves and even other elves. The other type
                    (including the high elves of Greyhawk, the Qualinesti of
                    Dragonlance, and the moon elves of the Forgotten Realms) are
                    more common and more friendly, and often encountered among
                    humans and other races.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </div>
        )}
      </React.Fragment>
    </Box>
  );
}
const races: Race[] = [
  { id: 1, label: "Centaur", languages: [0, 3] },
  { id: 1, label: "Dragonborn", languages: [0, 3] },
  { id: 1, label: "Elf (High)", languages: [0, 1] },
  { id: 1, label: "Goblin", languages: [0, 2] },
  { id: 1, label: "Human", languages: [0, 3] },
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
