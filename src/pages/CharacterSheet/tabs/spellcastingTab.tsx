import { Grid } from "@mui/material";
import AttacksTable, { RowData } from "../components/attacksTable";
import StatsGrid from "../components/statsGrid";



const rows: RowData[] = [
    {
      columns: ["Longsword", "+5", "Slashing"],
      description: "lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    {
      columns: ["Dagger", "+3", "Piercing"],
      description: "lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    {
      columns: ["Fireball", "+8", "Fire"],
      description: "lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
];

const slotsData = [
    {
      columns: ["1", "5"],
    },
    {
      columns: ["2", "3"],
    },
    {
      columns: ["3", "1"],
    },
];

export default function SpellcastingTab() {
  return (
    <>
      <Grid container spacing={2} flexDirection={"column"}>
        <Grid container item spacing={2}>
          <Grid item sm={7} xs={12}>
            <StatsGrid
              title="Magic"
              items={[
                { header: "speed", value: "12 ft" },
                { header: "Initiative", value: "+2" },
                { header: "Prof. Bonus", value: "+2" },
              ]}
            />
          </Grid>
          <Grid item container sm xs={12}>
            <AttacksTable
              rows={slotsData}
              headers={["level", "count"]}
              showDescription={false}
            />
          </Grid>
        </Grid>
        <Grid item>
          <AttacksTable
            rows={rows}
            headers={["Name", "Attack bonus", "Damage type"]}
            showDescription
          />
        </Grid>
      </Grid>
    </>
  );
}
