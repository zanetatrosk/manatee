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
//interface used for autocomplete
interface AutocompleteItem {
  id: number;
  title: string;
}
const languages: AutocompleteItem[] = [
  // Elvish languages
  { id: generateId(), title: "Common Elvish" },
  { id: generateId(), title: "High Elvish" },
  { id: generateId(), title: "Wood Elvish" },
  { id: generateId(), title: "Drow Sign Language" },

  // Dwarvish languages
  { id: generateId(), title: "Common Dwarvish" },
  { id: generateId(), title: "Hill Dwarvish" },
  { id: generateId(), title: "Mountain Dwarvish" },

  // Draconic languages
  { id: generateId(), title: "Common Draconic" },
  { id: generateId(), title: "High Draconic" },
  { id: generateId(), title: "Ancient Draconic" },

  // Gnomish languages
  { id: generateId(), title: "Common Gnomish" },
  { id: generateId(), title: "Rock Gnomish" },
  { id: generateId(), title: "Forest Gnomish" },

  // Orcish languages
  { id: generateId(), title: "Common Orcish" },
  { id: generateId(), title: "Black Orcish" },
  { id: generateId(), title: "Gray Orcish" },

  // Celestial languages
  { id: generateId(), title: "Common Celestial" },
  { id: generateId(), title: "High Celestial" },

  // Infernal languages
  { id: generateId(), title: "Common Infernal" },
  { id: generateId(), title: "High Infernal" },

  // Abyssal languages
  { id: generateId(), title: "Common Abyssal" },
  { id: generateId(), title: "High Abyssal" },

  // Giant languages
  { id: generateId(), title: "Common Giant" },
  { id: generateId(), title: "Hill Giant" },
  { id: generateId(), title: "Stone Giant" },

  // Undercommon languages
  { id: generateId(), title: "Common Undercommon" },
  { id: generateId(), title: "High Undercommon" },
];
function generateId(): number {
  return Math.random();
}
const races = [
  { label: "Centaur" },
  { label: "Dragonborn" },
  { label: "Elf (High)" },
  { label: "Goblin" },
  { label: "Human" },
];
export default function Race() {
  const [size, setSize] = React.useState("M");
  function handleChange(event: SelectChangeEvent) {
    setSize(event.target.value);
  }
  return (
    <Box sx={{ pt: 2, pb: 3 }}>
      <Grid container sx={{ py: 2 }}>
        <Grid item lg={7} xs={12}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={races}
            sx={{ m: 2 }}
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
            defaultValue={languages[0]}
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
            <Typography gutterBottom variant="h5" component="div" align="left">
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
            <Typography variant="body1" color="text.secondary" align="justify">
              20 km/h
            </Typography>
          </CardContent>
          <CardContent
            sx={{
              display: "flex",
            }}
          >
            <Typography variant="body1" color="text.secondary" align="justify">
              As a high elf, you have a keen mind and a mastery of at least the
              basics of magic. In many of the worlds of D&D, there are two kinds
              of high elves. One type (which includes the gray elves and valley
              elves of Greyhawk, the Silvanesti of Dragonlance, and the sun
              elves of the Forgotten Realms) is haughty and reclusive, believing
              themselves to be superior to non-elves and even other elves. The
              other type (including the high elves of Greyhawk, the Qualinesti
              of Dragonlance, and the moon elves of the Forgotten Realms) are
              more common and more friendly, and often encountered among humans
              and other races.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
