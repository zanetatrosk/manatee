import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Icon,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  SvgIcon,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Toolbar,
  Typography,
  alpha,
} from "@mui/material";
import React from "react";
import { RowData } from "./CharacterSheet/components/attacksTable";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function EnhancedTableToolbar({ numSelected }: { numSelected: number }) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
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
          {numSelected} selected
        </Typography>
      )}
    </Toolbar>
  );
}
interface Data {
  id: number;
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

const rows: RowData[] = [
  {
    columns: ["Dagger", "1d4", "Piercing", "Finesse, Light, Thrown"],
    description:
      "A small, easily concealed weapon that can be used for stabbing or throwing.",
  },
  {
    columns: ["Dagger", "1d4", "Piercing", "Finesse, Light, Thrown"],
    description:
      "A small, easily concealed weapon that can be used for stabbing or throwing.",
  },
  {
    columns: ["Dagger", "1d4", "Piercing", "Finesse, Light, Thrown"],
    description:
      "A small, easily concealed weapon that can be used for stabbing or throwing.",
  },
  {
    columns: ["Dagger", "1d4", "Piercing", "Finesse, Light, Thrown"],
    description:
      "A small, easily concealed weapon that can be used for stabbing or throwing.",
  },
  {
    columns: ["Dagger", "1d4", "Piercing", "Finesse, Light, Thrown"],
    description:
      "A small, easily concealed weapon that can be used for stabbing or throwing.",
  },
  {
    columns: ["Dagger", "1d4", "Piercing", "Finesse, Light, Thrown"],
    description:
      "A small, easily concealed weapon that can be used for stabbing or throwing.",
  },
  {
    columns: ["Dagger", "1d4", "Piercing", "Finesse, Light, Thrown"],
    description:
      "A small, easily concealed weapon that can be used for stabbing or throwing.",
  },
  {
    columns: ["Dagger", "1d4", "Piercing", "Finesse, Light, Thrown"],
    description:
      "A small, easily concealed weapon that can be used for stabbing or throwing.",
  },
];

function EnhancedTable() {
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {selected.length > 0 && (
          <EnhancedTableToolbar numSelected={selected.length} />
        )}
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Name</TableCell>
                <TableCell >Level</TableCell>
                <TableCell >Range</TableCell>
                <TableCell >Range</TableCell>
                <TableCell align="right"/>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(index);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onClick={(event) => handleClick(event, index)}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      {row.columns.map((col, idx) => (
                        <TableCell>
                          <Typography variant="body2">{col}</Typography>
                        </TableCell>
                      ))}
                      {row.description && (
                        <TableCell align="right" padding="checkbox">
                          <IconButton
                            sx={{ mr: 1 }}
                            aria-label="expand row"
                            size="small"
                          >
                            <KeyboardArrowDownIcon />
                          </IconButton>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
export default function HomePage() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>
          Add a spell
          <TextField
            variant="outlined"
            label="Search"
            fullWidth
            sx={{ mt: 3 }}
          />
        </DialogTitle>
        <DialogContent>
          <EnhancedTable />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Add Selected
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
