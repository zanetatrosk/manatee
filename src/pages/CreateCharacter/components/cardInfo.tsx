import * as React from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import { Feature } from "@pages/CreateCharacter/definitions/characterForm";

  interface PropsParams {
    title: string;
    features: Feature[];
    description: string;
  }

  CardInfo.defaultProps = {
    title: "Title",
    features: [],
    description: "Description",
  };
export default function CardInfo(props: PropsParams) {
  React.useEffect(() => {
    console.log(props.features, "features");
  }, [props.features]);
  return (
    <Box display="flex" my={2}>
      <Card
        sx={{
          display: "flex",
          p: 1,
          my: 2,
          width: "100%",
          justifyContent: "flex-start",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ display: "flex", pb: 0 }}>
          <Typography gutterBottom variant="h5" component="div" align="left">
            {props.title}
          </Typography>
        </CardContent>
        <CardContent
          sx={{
            py: 0,
          }}
        >
          <div style={{ width: "100%" }}>
            {props.features.map((feature) => (
              <Grid container my={1.5} key={feature.title}>
              <Grid item xs={12} sm={2} pr={0.5}>
                <Typography variant="body1">{feature.title}</Typography>
              </Grid>
              <Grid item xs={12} sm={10}>
                <Typography variant="body1" color="text.secondary" align="justify">{feature.text}</Typography>
              </Grid>
            </Grid>
            ))}
          </div>
        </CardContent>
        <CardContent
          sx={{
            display: "flex",
          }}
        >
          <Typography variant="body1" color="text.secondary" align="justify">
            {props.description}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

