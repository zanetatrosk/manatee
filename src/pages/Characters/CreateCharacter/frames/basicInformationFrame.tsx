import {
  Autocomplete,
  Box,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
export default function BasicInformation() {
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
const sources = [
  "Player's Handbook",
  "Dungeon Master's Guide",
  "Monster Manual",
  "Sword Coast Adventurer's Guide",
  "Volo's Guide to Monsters",
  "Xanathar's Guide to Everything",
  "Mordenkainen's Tome of Foes",
  "Guildmasters' Guide to Ravnica",
  "Eberron: Rising from the Last War",
  "Explorer's Guide to Wildemount",
  "Mythic Odysseys of Theros",
  "Tasha's Cauldron of Everything",
  "Wayfinder's Guide to Eberron",
  "Acquisitions Incorporated",
  "The Tortle Package",
  "Locathah Rising",
  "The Lost Laboratory of Kwalish",
  "The Wild Beyond the Witchlight",
  "Van Richten's Guide to Ravenloft",
  "Fizban's Treasury of Dragons",
  "Candlekeep Mysteries",
  "The Wild Beyond the Witchlight",
];
