import { Box } from "@mui/material";
import AttacksTable from "./attacksTable";
import ArmorTable from "./armorTable";

export default function AttacksAndArmorTab() {
  return (
    <>
      <AttacksTable />
      <Box sx={{ margin: 3 }} />
      <ArmorTable />
    </>
  );
}
