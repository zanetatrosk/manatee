import {
  TableRow,
  TableCell, Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TablePagination,
  TextField
} from "@mui/material";
import React from "react";
import { RowData } from "@components/crudTable";
import EnhancedTableToolbar from "./enhancedToolbar";
import FilteredRow from "./filteredRow";

// This component is used to display a table with a search bar and pagination.
export default function FilteredTable({
  rows,
  totalElements,
  setPagination,
  selectedIds,
  setSelectedIds,
  singleChoice,
  headers,
}: {
  rows: RowData[];
  totalElements: number;
  setPagination: (pag: { page: number; size: number; query: string }) => void;
  selectedIds: string[];
  setSelectedIds: (ids: string[]) => void;
  singleChoice?: boolean;
  headers: string[];
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [query, setQuery] = React.useState("");

  const [selected, setSelected] = React.useState<Set<string>>(
    new Set(selectedIds),
  );
  const isSelected = (id: string) => selected.has(id);

  const handleClick = (id: string) => {
    if (singleChoice) {
      setSelected(new Set([id]));
      setSelectedIds([id]);
      return;
    }
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelected(newSelected);
    setSelectedIds(Array.from(newSelected));
  };

  const handleQueryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setQuery(e.target.value);
    setPagination({ page: 0, size: rowsPerPage, query: e.target.value });
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPagination({ page: newPage, size: rowsPerPage, query: query });
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setPagination({
      page: 0,
      size: parseInt(event.target.value, 10),
      query: query,
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        variant="outlined"
        label="Search"
        fullWidth
        value={query}
        onChange={(e) => handleQueryChange(e)}
        sx={{ mt: 3, mb: 2 }}
        size="small"
      />
      <Paper sx={{ width: "100%", mb: 2 }} elevation={3}>
        {selected.size > 0 && (
          <EnhancedTableToolbar numSelected={selected.size} />
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
                {headers.map((header) => (
                  <TableCell key={header}>{header}</TableCell>
                ))}
                <TableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <FilteredRow
                  key={row.id}
                  row={row}
                  idx={index}
                  lastIdx={rows.length - 1}
                  handleClick={(str) => handleClick(str)}
                  selected={isSelected(row.id!)}
                  singleChoice={singleChoice}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalElements || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
