import * as React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
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
          {props.features.map(
            (feature) =>
            <Box sx={{display: 'flex'}}>
                <Typography
                  variant="body1"
                  align="justify"
                  sx={{ pr: 1 }}
                >
                  {feature.title}: 
                </Typography>
                <Typography variant="body1" color="text.secondary" align="justify">
                {feature.text}
              </Typography>
              </Box>
              
          )}
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
