import { Box, CardContent, Typography, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import { Feature } from "@definitions/characterForm";

interface PropsParams {
  title: string;
  features?: Feature[];
  description: string;
}

export default function CardInfo({ ...props }: PropsParams) {
  return (
    <Box display="flex" my={2}>
      <Card
        data-cy="card-info"
        sx={{
          display: "flex",
          p: 1,
          my: 2,
          width: "100%",
          justifyContent: "flex-start",
          flexDirection: "column",
        }}
        elevation={4}
      >
        <CardContent sx={{ display: "flex", pb: 0 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            align="left"
            data-cy="card-title"
          >
            {props.title}
          </Typography>
        </CardContent>
        <CardContent
          sx={{
            py: 0,
          }}
        >
          <div style={{ width: "100%" }}>
            {props.features?.map((feature, idx) => (
              <Grid container my={1.5} key={feature.title}>
                <Grid item xs={12} sm={2} pr={0.5}>
                  <Typography variant="body1" data-cy={"feat-" + idx}>
                    {feature.title}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={10}>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    align="justify"
                  >
                    {feature.text}
                  </Typography>
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
          <Typography
            variant="body1"
            color="text.secondary"
            align="justify"
            data-cy="card-descr"
          >
            {props.description}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
