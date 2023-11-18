import { Card, Grid, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";

function LittleCard({item}: {item: Item}) {
  return (
    <Paper
      elevation={12}
      sx={{ borderRadius: 1, py: 1, pb: 0.3, width: 128, height: 84 }}
    >
      <Grid container flexDirection="column" justifyItems="center">
        <Grid item container justifyContent="center">
          <Typography variant="button" gutterBottom component={"span"} noWrap>
            {item.header}
          </Typography>
        </Grid>
        <Grid item container justifyContent="center">
          <Typography variant="h4">{item.value}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
interface Item{
  header: string;
  value: string;
}
interface Props {
  title: string;
  items: Item[];
}

export default function StatsGrid(props: Props) {

  return (
    <Box display="flex" justifyContent="center">
      <Card sx={{ p: 4, display: "flex", maxWidth: 520 }}>
        <Grid container flexDirection={"column"} rowSpacing={3}>
          <Grid item>
            <Typography variant="h5" component="div">
              {props.title}
            </Typography>
          </Grid>
          <Grid container item spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, md: 12 }} >
            {props.items.map((i: Item) => (
              <Grid item container justifyContent={"center"} xs={6} md={4}  key={i.header} >
                <LittleCard 
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
// const items : Item[] = [
//   {
//     header: "speed",
//     value: "35 ft",
//   },
//   {
//     header: "Initiative",
//     value: "+2",
//   },
//   {
//     header: "Prof. Bonus",
//     value: "+2",
//   },
//   {
//     header: "Armor Class",
//     value: "15",
//   },
//   {
//     header: "Hit Points max",
//     value: "412",
//   },
//   {
//     header: "Hit Dice",
//     value: "1d10",
//   },
//   {
//     header: "Hit Dice",
//     value: "1d10",
//   },
//   {
//     header: "Hit Dice",
//     value: "1d10",
//   },
//   {
//     header: "Hit Dice",
//     value: "1d10",
//   },
//   {
//     header: "Hit Dice",
//     value: "1d10",
//   },
//   {
//     header: "Hit Dice",
//     value: "1d10",
//   },
  
  
  
 
// ];
