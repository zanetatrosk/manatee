import { Box, Typography } from "@mui/material";
import { WELCOME } from "constants/characterDefinition";


export default function HomePage() {
  

  return (
    <Box>
      <Typography variant="h4">{WELCOME.HEADING}</Typography>
    </Box>
  );
}
