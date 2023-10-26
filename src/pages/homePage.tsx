import {
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import AbilityCard from "./CharacterSheet/components/abilityCard";
import SkillTable from "./CharacterSheet/components/skillTable";
import HeaderCard from "./CharacterSheet/components/headerCard";
import StatsGrid from "./CharacterSheet/components/statsGrid";

interface Item {
  header: string;
  value: string;
}

export default function HomePage() {
  return (
    <Container>
      <Paper sx={{ p: 1 }} elevation={4}>
        <Grid container flexDirection={"column"} spacing={7}>
                  <Grid item container spacing={2}>
                    <Grid item>
                      <Card sx={{ width: 250, height: 336 }} />
                    </Grid>
                            <Grid item container xs flexDirection={"column"} spacing={4}>
                              <Grid item>
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

          <Grid container item spacing={3}>
            <Grid item>
              <SkillTable
                name="Skills"
                description="Choose which skills you are proficient in."
                tableData={tableData}
              />
            </Grid>
            <Grid item xs={3.5}>
              <SkillTable
                name="Saving Throws"
                description="Choose which saving throws you are proficient in."
                tableData={tableData.slice(0, 6)}
              />
            </Grid>
            <Grid item xs>
            <StatsGrid
            title="Stats"
            items={items}
            />
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
  {
    header: "Hit Dice",
    value: "1d10",
  },
  {
    header: "Hit Dice",
    value: "1d10",
  },
  {
    header: "Hit Dice",
    value: "1d10",
  },

];
