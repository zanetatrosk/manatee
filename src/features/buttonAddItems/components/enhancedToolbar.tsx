import { Toolbar, alpha, Typography } from "@mui/material";
import { CHARACTER_SHEET } from "constants/characterDefinition";

export default function EnhancedTableToolbar({ numSelected }: { numSelected: number }) {
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity,
              ),
          }),
        }}
      >
        {numSelected > 0 && (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected + " " + CHARACTER_SHEET.MODAL_ADD.SELECTED}
          </Typography>
        )}
      </Toolbar>
    );
  }