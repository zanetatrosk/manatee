import { Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";

function LittleCard() {
  return (
    <Paper
      elevation={12}
      sx={{ borderRadius: 1, px: 3, py: 1, pb: 0.3, width: 128 }}
    >
      <Grid container flexDirection="column" justifyItems="center">
        <Grid item container justifyContent="center">
          <Typography variant="button" gutterBottom>
            Speed
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h4">35 ft</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default function HomePage() {
  return (
    <Box display="flex" justifyContent="center">
      <Card sx={{ p: 4, display: "flex", maxWidth: 600 }}>
        <Grid container flexDirection={"column"} spacing={3}>
          <Grid item>
            <Typography variant="h5" component="div">
              Home Page
            </Typography>
          </Grid>
            <Grid container item spacing={3} alignItems={"center"}>
              {Array.from(Array(6).keys()).map((i) => (
                <Grid item container xs key={i} justifyContent={"center"}>
                  <LittleCard />
                </Grid>
              ))}
            </Grid>
          </Grid>
      </Card>
    </Box>
  );
}
