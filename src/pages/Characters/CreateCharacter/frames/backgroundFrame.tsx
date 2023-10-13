import * as React from "react";
import { Box, Autocomplete, Divider, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import MultiComplete from "@components/customMultiComplete";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { Background, AutocompleteItem } from "@pages/Characters/definitions/characterForm";
import CardInfo from "../components/cardInfo";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooksStore";
import { setBackground as setBackgroundStore } from "reducers/characterReducer";



export default function BackgroundFrame() {
  const [isVisible, setVisibility] = React.useState(false);
  const [languagesValue, setLanguages] = useState<AutocompleteItem[]>([]);
  const backgroundStore = useAppSelector((state) => state.character.background);
  const dispatch = useAppDispatch();
  const [background, setBackground] = useState<Background | null>(null || backgroundStore);
  const [toolsValue, setTools] = useState<AutocompleteItem[]>([]);
  useEffect(() => {
    if (!background) return;
    setLanguages(background?.languages?.defaults || []);
    setTools(background?.tools?.defaults || []);
    setVisibility(true);
    const tmpBack = background;
    dispatch(setBackgroundStore(tmpBack));
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
                  helpText={`Please choose ${background?.languages.amount} languages`}
                  placeholder="elsiftisna"
                  maxItems={background?.languages.amount || 0 }
                />
              </Grid>
              <Grid item lg={6} xs={12} sx={{ p: 2 }}>
                <MultiComplete
                  values={proficiencyTools}
                  results={toolsValue}
                  onChange={setTools}
                  label="Proficiency tools"
                  helpText={`Please choose ${background?.tools.amount} tools`}
                  placeholder="some tool"
                  maxItems={background?.tools.amount || 0}
                />
              </Grid>
            </Grid>
            <CardInfo
            title={background?.label || ""}  
            features={background?.features || []}   
            description={background?.description || ""}           
            />
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
    languages: {
      amount: 2,
      defaults: [
        { id: 1, title: "Common" },
        { id: 17, title: "Celestial" },
      ],
    },
    tools: {
      amount: 0,
      defaults: [],
    },
    description:
      "You have spent your life in the service of a temple to a specific god or pantheon of gods. You act as an intermediary between the realm of the holy and the mortal world, performing sacred rites and offering sacrifices in order to conduct worshipers into the presence of the divine. You are not necessarily a cleric—performing sacred rites is not the same thing as channeling divine power.",
    features: [
      {
        title: "Shelter of the Faithful",
        text:
          "As an acolyte, you command the respect of those who share your faith, and you can perform the religious ceremonies of your deity. You and your adventuring companions can expect to receive free healing and care at a temple, shrine, or other established presence of your faith, though you must provide any material components needed for spells. Those who share your religion will support you (but only you) at a modest lifestyle.",
      },
    ],
  },
  {
    id: 2,
    label: "Charlatan",
    languages: {
      amount: 0,
      defaults: [],
    },
    tools: {
      amount: 0,
      defaults: [],
    },
    description:
      "You have always had a way with people. You know what makes them tick, you can tease out their hearts' desires after a few minutes of conversation, and with a few leading questions you can read them like they were children's books. It's a useful talent, and one that you're perfectly willing to use for your advantage.",
    features: [
      {
        title: "False Identity",
        text:
          "You have created a second identity that includes documentation, established acquaintances, and disguises that allow you to assume that persona. Additionally, you can forge documents including official papers and personal letters, as long as you have seen an example of the kind of document or the handwriting you are trying to copy.",
      },
    ],
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
