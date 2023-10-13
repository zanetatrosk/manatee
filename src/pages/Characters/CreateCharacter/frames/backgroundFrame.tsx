import * as React from "react";
import { Box, Autocomplete, Divider, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import MultiComplete from "@components/customMultiComplete";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { Background, AutocompleteItem } from "@pages/Characters/definitions/characterForm";



export default function BackgroundFrame() {
  const [background, setBackground] = useState<Background | null>(null);
  const [isVisible, setVisibility] = React.useState(false);
  const [languagesValue, setLanguages] = useState<AutocompleteItem[]>(
    languages.filter((option) =>
      background?.languages.find((id) => id === option.id)
    )
  );
  const [toolsValue, setTools] = useState<AutocompleteItem[]>([]);
  useEffect(() => {
    const resLen = languages.filter((option) => {
      const result = background?.languages.find(
        (id) => id === option.id
      );
      return result;
    })
    setLanguages(resLen);
    const tools: AutocompleteItem[] = proficiencyTools.filter(
      (option) => background?.tools.find((id) => id === option.id)
    );
    setTools(tools);
    console.log("information from effect resLen", resLen);
  }, [background]);

  return (
    <Box>
      <Grid container>
        <Grid item lg={7} xs={12}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={backgrounds}
            value={background}
            sx={{ m: 2 }}
            onChange={(_, value: Background | null) => {
              if (!value) return;
              setBackground(value);
              background?.label !== ""
                ? setVisibility(true)
                : setVisibility(false);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Background"
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
                  results={languagesValue}
                  onChange={setLanguages}
                  label="Languages"
                  helpText="Please choose 2 languages"
                  placeholder="elsiftisna"
                  maxItems={3}
                />
              </Grid>
              <Grid item lg={6} xs={12} sx={{ p: 2 }}>
                <MultiComplete
                  values={proficiencyTools}
                  results={toolsValue}
                  onChange={setTools}
                  label="Proficiency tools"
                  helpText="Please choose 2 tools"
                  placeholder="some tool"
                  maxItems={3}
                />
              </Grid>
            </Grid>
          </div>
        )}
      </React.Fragment>
    </Box>
  );
}
// TypeScript array of objects representing D&D backgrounds

const backgrounds: Background[] = [
  {
    id: 1,
    label: "Acolyte",
    languages: [1, 2],
    tools: [2, 3],
  },
  {
    id: 2,
    label: "Charlatan",
    languages: [1],
    tools: [4],
  },
  {
    id: 3,
    label: "Folk Hero",
    languages: [],
    tools: [6, 7],
  },
  {
    id: 4,
    label: "Noble",
    languages: [3],
    tools: [8],
  },
  {
    id: 5,
    label: "Sage",
    languages: [1],
    tools: [5],
  },
  {
    id: 6,
    label: "Soldier",
    languages: [],
    tools: [3],
  },
  {
    id: 7,
    label: "Urchin",
    languages: [],
    tools: [3, 4],
  },
  // Add more backgrounds as needed
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

const proficiencyTools: AutocompleteItem[] = [
  { id: 1, title: "Alchemist’s Supplies" },
  { id: 2, title: "Brewer’s Supplies" },
  { id: 3, title: "Calligrapher’s Supplies" },
  { id: 4, title: "Carpenter’s Tools" },
  { id: 5, title: "Cartographer’s Tools" },
  { id: 6, title: "Cobbler’s Tools" },
  { id: 7, title: "Cook’s Utensils" },
  { id: 8, title: "Glassblower’s Tools" },
  { id: 9, title: "Jeweler’s Tools" },
  { id: 10, title: "Leatherworker’s Tools" },
  { id: 11, title: "Mason’s Tools" },
  { id: 12, title: "Painter’s Supplies" },
  { id: 13, title: "Potter’s Tools" },
  { id: 14, title: "Smith’s Tools" },
  { id: 15, title: "Tinker’s Tools" },
  { id: 16, title: "Weaver’s Tools" },
  { id: 17, title: "Woodcarver’s Tools" },
  { id: 18, title: "Disguise Kit" },
  { id: 19, title: "Forgery Kit" },
  { id: 20, title: "Herbalism Kit" },
  { id: 21, title: "Navigator’s Tools" },
  { id: 22, title: "Poisoner’s Kit" },
  { id: 23, title: "Thieves’ Tools" },
  { id: 24, title: "Dice Set" },
  { id: 25, title: "Dragonchess Set" },
  { id: 26, title: "Playing Card Set" },
  { id: 27, title: "Three-Dragon Ante Set" },
  { id: 28, title: "Land Vehicles" },
  { id: 29, title: "Water Vehicles" },
];
