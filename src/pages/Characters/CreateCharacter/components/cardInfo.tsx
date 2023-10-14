import * as React from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import { Feature } from "@pages/Characters/definitions/characterForm";
interface PropsParams {
  title: string | null;
  features: Feature[] | [];
  description: string | null;
}
export default function CardInfo(props: PropsParams) {
  React.useEffect(() => {
    console.log(props.features, "features");
  }, [props.features]);
  return (
    <Box display="flex">
      <Card
        sx={{
          display: "flex",
          m: 2,
          p: 1,
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
              <Grid container my={1.5}>
              <Grid item xs={12} sm={2}>
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