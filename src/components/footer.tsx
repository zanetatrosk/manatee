import { Box, Paper, Grid } from "@mui/material";
import * as React from "react";
export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        minHeight: '110px',
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
    </Box>
  );
}
