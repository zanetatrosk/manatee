import { Card, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

export default function HeaderCard() {
  return (
    <Box display="flex" justifyContent={"center"} flexGrow={1} >
      <Card sx={{ display: "flex", p: 3, width: "100%" }}>
        <Grid container flexDirection={"column"} spacing={3} >
          <Grid item wrap="nowrap">
            <Typography variant="h4" component="span" >
              Neville Longbottom the 3rd
            </Typography>
          </Grid>
          <Grid item container spacing={4}  rowSpacing={1}>
            {data.map((i) => (
              <React.Fragment>
                <Grid
                  item
                  container
                  xs
                  flexDirection={"column"}
                >
                  <Grid item>
                    <Typography
                      component="span"
                      color="text.secondary"
                      variant="caption"
                    >
                      {i.header}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography component="span" >
                      {i.value}
                    </Typography>
                  </Grid>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
const data = [
  {
    header: "Player",
    value: "Zanetaaaaaa",
  },
  {
    header: "Race",
    //add race that has the longest string
    value: "Dragonborn",
  },
  {
    header: "Class & level",
    value: "Barbarian 123",
  },
  {
    header: "Subclass",
    value: "Author",
  },
  {
    header: "Background",
    value: "Outlander",
  },
 
  
];
