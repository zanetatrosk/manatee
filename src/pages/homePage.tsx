import { Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import StatsGrid from "./CharacterSheet/components/statsGrid";

interface Item {
  header: string;
  value: string;
}
interface Props {
  title: string;
  items: Item[];
}

export default function HomePage() {
  return (
    <Box display="flex" justifyContent="center">
      <StatsGrid title="aaa" items={items} />
    </Box>
  );
}
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
  {
    header: "Hit Dice",
    value: "1d10",
  },
  {
    header: "Hit Dice",
    value: "1d10",
  },
];
