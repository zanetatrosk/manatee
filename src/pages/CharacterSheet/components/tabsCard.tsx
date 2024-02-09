import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Card, Grid } from "@mui/material";
import AttacksTable, { RowData } from "./attacksTable";
import StatsGrid from "./statsGrid";

export default function TabsCard() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

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

  return (
    <Box sx={{ width: "100%" }}>
      <Card>
        <TabContext value={value}>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider", display: "flex" }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Attacks and Armor" value="1" />
              <Tab label="Spellcasting" value="2" />
              <Tab label="Other prof. & languages" value="3" />
              <Tab label="Features" value="4" />
              <Tab label="Characteristics" value="5" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <AttacksTable
              rows={rows}
              headers={["Name", "Attack bonus", "Damage type"]}
              showDescription
            />
            <div style={{ margin: 30 }} />
            <AttacksTable
              rows={rows}
              headers={["Name", "Attack bonus", "Damage type"]}
              showDescription
            />
          </TabPanel>
          <TabPanel value="2">
            <Grid container spacing={2} flexDirection={"column"}>
              <Grid container item spacing={2}>
                <Grid item sm={7} xs={12}>
                  <StatsGrid
                    title="Magic"
                    items={[{ header: "speed", value: "12 ft" }, { header: "Initiative", value: "+2" }, { header: "Prof. Bonus", value: "+2" }]}
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
          </TabPanel>
          <TabPanel value="3">Other prof. & languages</TabPanel>
          <TabPanel value="4">Features</TabPanel>
          <TabPanel value="5">Characteristics</TabPanel>
        </TabContext>
      </Card>
    </Box>
  );
}
