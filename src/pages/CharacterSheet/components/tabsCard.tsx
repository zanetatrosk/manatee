import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Card, Grid } from "@mui/material";
import AttacksTable, { RowData } from "./attacksTable";
import StatsGrid from "./statsGrid";
import AttacksAndArmorTab from "../tabs/attacksAndArmorTab";
import SpellcastingTab from "../tabs/spellcastingTab";
import OtherProficienciesTab from "../tabs/otherProficienciesTab";
import FeaturesTab from "../tabs/featuresTab";
import { useAppSelector } from "@hooks/hooksStore";

export default function TabsCard() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const { spellcasting } = useAppSelector((state) => state.character);

  return (
    <Box sx={{ width: "100%" }}>
      <Card>
        <TabContext value={value}>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider", display: "flex" }}
          >
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              scrollButtons="auto"
              variant="scrollable"
            >
              <Tab label="Attacks and Armor" value="1" />
              {!!spellcasting && <Tab label="Spellcasting" value="2" />}
              <Tab label="Other prof. & languages" value="3" />
              <Tab label="Features" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <AttacksAndArmorTab />
          </TabPanel>
          <TabPanel value="2">
            <SpellcastingTab />
          </TabPanel>
          <TabPanel value="3">
            <OtherProficienciesTab />
          </TabPanel>
          <TabPanel value="4">
            <FeaturesTab />
          </TabPanel>
        </TabContext>
      </Card>
    </Box>
  );
}
