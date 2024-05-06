import { Box, Typography } from "@mui/material";
import { CONTENT } from "constants/characterDefinition";
import React from "react";

const ContentPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4">{CONTENT.HEADING}</Typography>
      <Typography>{CONTENT.DESCRIPTION}</Typography>
    </Box>
  );
};

export default ContentPage;
