import { Card, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

export default function HeaderCard() {
  return (
    <Box display="flex" justifyContent="center">
      <Card>
        <Grid container alignItems="center" p={3} columnSpacing={3}>
          <Grid item>
            <Typography variant="h4">Neville Longbottom aaaaa</Typography>
          </Grid>
          <Grid item />
          <Grid item container xs columnSpacing={4}>
          {data.map((i) => (
            <React.Fragment>
              <Grid item/>
              <Grid
                item
                container
                flexDirection="column"
                xs
                wrap="nowrap"
                p={3}
                spacing={0.5}
              >
                <Grid item xs>
                  <Typography
                    component="span"
                    noWrap
                    color="text.secondary"
                    variant="caption"
                  >
                    {i.header}
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography
                   component="span"
                   noWrap
                  >{i.value}</Typography>
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
];
