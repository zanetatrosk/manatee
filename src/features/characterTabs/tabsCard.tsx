import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Card } from "@mui/material";
import AttacksAndArmorTab from "./components/attacksAndArmorTab";
import SpellcastingTab from "./components/spellcastingTab";
import OtherProficienciesTab from "./components/otherProficienciesTab";
import FeaturesTab from "./components/featuresTab";
import { useAppSelector } from "@hooks/hooksStore";
import { CHARACTER_SHEET } from "constants/characterDefinition";

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
              scrollButtons="auto"
              variant="scrollable"
            >
              <Tab label={CHARACTER_SHEET.ATTACKS_AND_ARMOR} value="1" />
              {!!spellcasting && (
                <Tab label={CHARACTER_SHEET.SPELLCASTING.TITLE} value="2" />
              )}
              <Tab label={CHARACTER_SHEET.OTH_PROFICIENCIES.TITLE} value="3" />
              <Tab label={CHARACTER_SHEET.FEATURES.TITLE} value="4" />
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
