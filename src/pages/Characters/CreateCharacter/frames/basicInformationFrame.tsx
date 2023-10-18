import {
  Autocomplete,
  Box,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { AutocompleteItem } from "@pages/Characters/definitions/characterForm";
import React from "react";
export default function BasicInformation() {
  const [item, setItem] = React.useState("");
  return (
    <Grid container spacing={6} padding={2}>
      <Grid container item columnSpacing={8}>
        <Grid item xs={12} pb={2}>
          <Typography gutterBottom variant="h4" component="div" >
            Basic Information
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            variant="filled"
            label="Character Name"
          ></TextField>
        </Grid>
        <Grid item xs={12} lg={5}>
          <TextField variant="filled" fullWidth label="Player Name"></TextField>
        </Grid>
      </Grid>
      <Grid container item>
        <Grid item xs={12} pb={1}>
          <Typography gutterBottom variant="h5" component="div">
            Sources
          </Typography>
        </Grid>

        <Grid item xs>
          <Autocomplete
            id="combo-box-demo"
            options={sources}
            multiple
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Source"
                variant="filled"
                placeholder="Human"
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid container item direction={"row"} columnSpacing={8}>
        <Grid item xs={12} pb={1}>
          <Typography gutterBottom variant="h5" component="div">
            Images
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            variant="filled"
            label="Img src 1"
          ></TextField>
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField variant="filled" fullWidth label="Img src 2"></TextField>
        </Grid>
      </Grid>
    </Grid>
  );
}

//generate sources for dnd5e
const sources: AutocompleteItem[] = [
  {id: 0,  title: "Player's Handbook" },
  {id: 1,  title: "Dungeon Master's Guide" },
  {id: 2,  title: "Monster Manual" },
  {id: 3,  title: "Volo's Guide to Monsters" },
  {id: 4,  title: "Mordenkainen's Tome of Foes" },
  {id: 5,  title: "Xanathar's Guide to Everything" },
  {id: 6,  title: "Guildmasters' Guide to Ravnica" },
  {id: 7,  title: "Acquisitions Incorporated" },
  {id: 8,  title: "Eberron: Rising from the Last War" },
  {id: 9,  title: "Explorer's Guide to Wildemount" },
  {id: 10, title: "Mythic Odysseys of Theros" },
  {id: 11, title: "Tasha's Cauldron of Everything" },
  {id: 12, title: "Van Richten's Guide to Ravenloft" },
  {id: 13, title: "Fizban's Treasury of Dragons" },
  {id: 14, title: "Strixhaven: A Curriculum of Chaos" },
  {id: 15, title: "The Wild Beyond the Witchlight" },
  
];
