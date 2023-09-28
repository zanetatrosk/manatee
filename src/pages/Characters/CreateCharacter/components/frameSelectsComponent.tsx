import React from "react";
import {
  Box,
  Autocomplete,
  TextField,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  
 
];
export default function DynamicFrame() {
  return (
    <Box sx={{ pt: 2, pb: 3 }}>
      <Grid container sx={{ py: 2 }}>
        <Grid item lg={6} xs={12}>
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
      <Box >
        <Divider sx={{ p: 2  }}>
          <Typography variant="overline" display="block" gutterBottom>
            further information
          </Typography>
        </Divider>
      </Box>
      <Grid container sx={{ py: 2 }}>
        {Array.from(Array(5)).map((_, index) => (
          <Grid item lg={4} xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={top100Films}
              sx={{ m: 2 }}
              renderInput={(params) => (
                <TextField {...params} label="Proficiency" variant="filled" />
              )}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
