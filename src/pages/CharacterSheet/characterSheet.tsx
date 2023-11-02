import { Card, CardMedia, Container, Grid, Paper } from "@mui/material";
import HeaderCard from "./components/headerCard";
import AbilityCard from "./components/abilityCard";
import SkillTable from "./components/skillTable";
import StatsGrid from "./components/statsGrid";
import TabsCard from "./components/tabsCard";


interface Item {
  header: string;
  value: string;
}

export default function CharacterSheet() {
  return (
    <Container>
      <Paper sx={{ p: 2 }} elevation={4}>
        <Grid container flexDirection={"column"} spacing={5}>
          {/* first row */}
          <Grid item container spacing={2}>
            <Grid item>
              <Card sx={{ maxWidth: 250, height: "100%", maxHeight: 345 }}>
                <CardMedia
                sx={{ height: "100%"}}
                  component="img"
                  // Picture by internet user: 
                  src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/318394173/original/c4b3f1c87e9c941530cfdbabda92abbab1b7b622/make-dnd-character-art-and-character-design.png"
                  title="character"
                />
              </Card>
            </Grid>
            <Grid item container xs flexDirection={"column"} spacing={3}>
              <Grid item xs>
                <HeaderCard />
              </Grid>
              <Grid item container spacing={3} justifyContent="center">
                {Array.from(Array(6).keys()).map((i) => (
                  <Grid item key={i}>
                    <AbilityCard ability="Strength" score={12} modifier={1} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          {/* second row */}
          <Grid container item spacing={3} columns={{ xs: 12 }} >
            <Grid item>
              <SkillTable
                name="Skills"
                description="Choose which skills you are proficient in."
                tableData={tableData}
              />
            </Grid>
            <Grid container item flexDirection={"column"} spacing={3} xs>
              <Grid container item spacing={3}>
                <Grid item xs>
                  <SkillTable
                    name="Saving Throws"
                    description="Choose which saving throws you are proficient in."
                    tableData={savingThrows}
                  />
                </Grid>
                <Grid item >
                  <StatsGrid title="Stats" items={items} />
                </Grid>
              </Grid>
              <Grid container item xs>
                <Grid item xs>
                  <TabsCard />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

const tableData = [
  {
    label: "Animal Handling(WIS)",
    score: 8,
    checked: false,
  },
  {
    label: "Arcana(INT)",
    score: 8,
    checked: true,
  },
  {
    label: "Athletics(STR)",
    score: 8,
    checked: false,
  },
  {
    label: "Deception(CHA)",
    score: 8,
    checked: false,
  },
  {
    label: "History(INT)",
    score: 8,
    checked: false,
  },
  {
    label: "Insight(WIS)",
    score: 8,
    checked: false,
  },
  {
    label: "Intimidation(CHA)",
    score: 8,
    checked: false,
  },
  {
    label: "Investigation(INT)",
    score: 8,
    checked: false,
  },
  {
    label: "Medicine(WIS)",
    score: 8,
    checked: true,
  },
  {
    label: "Nature(INT)",
    score: 8,
    checked: false,
  },
  {
    label: "Perception(WIS)",
    score: 8,
    checked: false,
  },
  {
    label: "Performance(CHA)",
    score: 8,
    checked: false,
  },
  {
    label: "Persuasion(CHA)",
    score: 8,
    checked: false,
  },
  {
    label: "Religion(INT)",
    score: 8,
    checked: false,
  },
  {
    label: "Sleight of Hand(DEX)",
    score: 8,
    checked: false,
  },
  {
    label: "Stealth(DEX)",
    score: 8,
    checked: true,
  },
  {
    label: "Survival(WIS)",
    score: 8,
    checked: false,
  },
];
//generate saving throws in the same format as tableData
const savingThrows = [
  {
    label: "Strength",
    score: 8,
    checked: false,
  },
  {
    label: "Dexterity",
    score: 8,
    checked: true,
  },
  {
    label: "Constitution",
    score: 8,
    checked: false,
  },
  {
    label: "Intelligence",
    score: 8,
    checked: false,
  },
  {
    label: "Wisdom",
    score: 8,
    checked: false,
  },
  {
    label: "Charisma",
    score: 8,
    checked: false,
  },
];
const items: Item[] = [
  {
    header: "speed",
    value: "35 ft",
  },
  {
    header: "Initiative",
    value: "+2",
  },
  {
    header: "Prof. Bonus",
    value: "+2",
  },
  {
    header: "Armor Class",
    value: "15",
  },
  {
    header: "Hit Points max",
    value: "412",
  },
  {
    header: "Hit Dice",
    value: "1d10",
  },
];
