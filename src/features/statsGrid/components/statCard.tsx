import { Paper, Grid, Typography } from "@mui/material";

export interface Item {
    header: string;
    value: string;
}

export default function StatCard({item}: {item: Item}) {
    return (
      <Paper
        elevation={5}
        sx={{ borderRadius: 1, py: 1, pb: 0.3, width: 128, height: 84}}
      >
        <Grid container flexDirection="column" justifyItems="center">
          <Grid item container justifyContent="center">
            <Typography variant="button" sx={{ textOverflow: 'ellipsis' }} gutterBottom component={"span"} noWrap>
              {item.header}
            </Typography>
          </Grid>
          <Grid item container justifyContent="center" component="div">
            <Typography variant="h4" sx={{ textOverflow: 'ellipsis' }} noWrap>{item.value}</Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }