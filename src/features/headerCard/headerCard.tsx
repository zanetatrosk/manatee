import { Card, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

interface DisplayedHeaders {
  header: string;
  value: string;
}
interface DisplayedData {
  headers: DisplayedHeaders[];
  title: string;
}
export default function HeaderCard({
  props: character,
}: {
  props: DisplayedData;
}) {
  return (
    <Box display="flex" justifyContent={"center"} flexGrow={1}>
      <Card sx={{ p: 3, width: "100%" }}>
        <Grid container flexDirection={"column"} spacing={3}>
          <Grid item container maxWidth={800} zeroMinWidth>
            <Typography variant="h4" noWrap data-cy="character-name">
              {character.title}
            </Typography>
          </Grid>
          <Grid item container spacing={4} rowSpacing={1}>
            {character.headers.map((i, idx) => (
              <React.Fragment key={idx}>
                <Grid
                  item
                  container
                  data-cy={i.header}
                  xs
                  flexDirection={"column"}
                >
                  <Grid item>
                    <Typography
                      component="span"
                      color="text.secondary"
                      variant="caption"
                      noWrap
                    >
                      {i.header}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      component="span"
                      noWrap
                      data-cy={i.header + "-value"}
                    >
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
