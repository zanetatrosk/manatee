import { Card, Divider, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

export default function HomePage() {
  return (
    <Box display="flex" justifyContent="center">
      <Card>
        <Grid container alignItems="center" p={2} columnSpacing={3}>
          <Grid item p={1}>
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
                  <Typography>{i.value}</Typography>
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
    value: "Zaneta",
  },
  {
    header: "Race",
    value: "Human",
  },
  {
    header: "Class & level",
    value: "Wizard 1",
  },
];
