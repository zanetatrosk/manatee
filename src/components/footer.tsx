import { Box } from "@mui/material";
export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        minHeight: "110px",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    ></Box>
  );
}
