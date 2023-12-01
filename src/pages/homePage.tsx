import { Box, Typography } from "@mui/material";

import CharacterSheet from "./CharacterSheet/characterSheet";


export default function HomePage() {
  return (
    <Box data-cy="home">
    {/* <CharacterSheet/> */}
    <Typography variant="h4">Welcome to D&D App</Typography>
    </Box>
  );
}

