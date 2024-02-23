import { Box, Button, Modal, Typography } from "@mui/material";
import ModalAddItems from "./CharacterSheet/tabsComponents/modalAddItems/modal";
import React from "react";

export default function HomePage() {
  const [open, setOpen] = React.useState(false);
  return (
    <Box>
      <Typography variant="h4">Welcome to D&D App</Typography>
      <Button variant="outlined" >
        Future Open dialog
      </Button>
      {<ModalAddItems />}
    </Box>
  );
}
