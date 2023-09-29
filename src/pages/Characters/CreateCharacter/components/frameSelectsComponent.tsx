import * as React from "react";
import { Box, Autocomplete, TextField, Divider, Grid } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MultiComplete from "@components/customMultiComplete";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";

interface ComponentRegister {
  id: number;
  component: React.ReactElement;
}
const currencies = [
  {
    value: "M",
    label: "Medium",
  },
  {
    value: "S",
    label: "Small",
  },
  
];

const components: ComponentRegister[] = [
  { id: 0, component: <MultiComplete /> },
];
const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
];
export default function DynamicFrame() {
  const [size, setSize] = React.useState("Medium");

  return (
    <Box sx={{ pt: 2, pb: 3 }}>
      <Grid container sx={{ py: 2 }}>
        <Grid item lg={7} xs={12}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            sx={{ m: 2 }}
            renderInput={(params) => (
              <TextField {...params} label="Race" variant="filled" />
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
          <MultiComplete />
        </Grid>
        <Grid item lg={4} xs={12} sx={{ p: 2, pl: 7 }}>
          <TextField
            id="outlined-select-currency-native"
            select
            variant="filled"
            label="Size"
            defaultValue="Medium"
            SelectProps={{
              native: true,
            }}
            fullWidth
          >
            {currencies.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Grid>
      </Grid>
      {/* <Box>
        <Divider sx={{ p: 2 }}>
          <Typography variant="overline" display="block" gutterBottom>
            further information
          </Typography>
        </Divider>
      </Box> */}
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
          
            <CardContent sx={{ display: "flex" , pb: 0 }}>
              <Typography gutterBottom variant="h5" component="div" align="left">
                High Elf
              </Typography>
            </CardContent>
            <CardContent
              sx={{
                display: "flex",
                py: 0
              }}
            >
              <Typography gutterBottom variant="body1" component="div" align="left" sx={{pr: 1}}>
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
              As a high elf, you have a keen mind and a mastery of at least the basics of magic. In many of the worlds of D&D, there are two kinds of high elves. One type (which includes the gray elves and valley elves of Greyhawk, the Silvanesti of Dragonlance, and the sun elves of the Forgotten Realms) is haughty and reclusive, believing themselves to be superior to non-elves and even other elves. The other type (including the high elves of Greyhawk, the Qualinesti of Dragonlance, and the moon elves of the Forgotten Realms) are more common and more friendly, and often encountered among humans and other races.
              </Typography>
            </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
