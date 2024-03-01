import { Box, CircularProgress } from "@mui/material";

export default function Spinner() {
return (
	<Box sx={{ display: 'flex', justifyContent: "center", mt: 5, flexGrow: 1 }}>
	  <CircularProgress />
	</Box>
  );
}