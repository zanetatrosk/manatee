import { Card, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import StatCard, { Item } from "./components/statCard";


interface Props {
  title: string;
  items: Item[];
}

const StatsGrid = ({ ...props }: Props) =>  {
  return (
    <Box display="flex" flexGrow={1}>
      <Card sx={{ p: 4 }}>
        <Grid container flexDirection={"column"} spacing={3} >
          <Grid item>
            <Typography variant="h5" component="div">
              {props.title}
            </Typography>
          </Grid>
          <Grid container item spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, md: 12 }}>
            {props.items.map((i: Item) => (
              <Grid item container justifyContent={"center"} xs={6} md={6} lg={4} xl={4} key={i.header}>
                <StatCard 
                  item={i}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
export default StatsGrid;