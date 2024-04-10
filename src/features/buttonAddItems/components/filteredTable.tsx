import {
  Toolbar,
  alpha,
  Typography,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  Collapse,
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TablePagination,
  TextField,
} from "@mui/material";
import { useGetSpellsQuery } from "api/generalContentApiSlice";
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { RowData } from "@components/crudTable";

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

export interface ItemsProps {
  data: RowData[];
  totalElements: number;
}
export const useSpells = (
  page: number,
  size: number,
  query: string
): ItemsProps => {
  const spellsInfo = useGetSpellsQuery({
    page: page,
    size: size,
    query: query,
  }).data;
  if (spellsInfo) {
    return {
      data: spellsInfo.content.map((spell) => {
        return {
          id: spell.id,
          columns: [spell.name, spell.level.toString(), spell.castingTime],
          description: spell.description,
        };
      }),
      totalElements: spellsInfo.totalElements,
    };
  }
  return {
    data: [],
    totalElements: 0,
  };
};

function Row(props: {
  row: RowData;
  idx: number;
  lastIdx: number;
  handleClick: (event: React.MouseEvent<unknown>, id: string) => void;
  selected: boolean;
}) {
  const { row, idx, lastIdx, selected } = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow
        key={idx}
        aria-checked={selected}
        tabIndex={-1}
        selected={selected}
        sx={[open && { "& > *": { borderBottom: 0 } }]}
      >
        <>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              checked={selected}
              onClick={(event) => {
                props.handleClick(event, row.id!);
              }}
            />
          </TableCell>
          {row.columns.map((col) => (
            <TableCell component="th" scope="row">
              <Typography variant="body2">{col}</Typography>
            </TableCell>
          ))}
        </>
        <TableCell align="right" padding="checkbox">
          {row.description && (
            <IconButton
              sx={{ mr: 1 }}
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6} sx={[!open && { "& > *": { borderTop: 0 } }]}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box py={2} display="flex" flexGrow={1} sx={{ overflow: "auto" }}>
              <Typography variant="body2" gutterBottom>
                {row.description}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

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

  const [selected, setSelected] = React.useState<Set<string>>(new Set(selectedIds));
  const isSelected = (id: string) => selected.has(id);

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setPagination({
      page: 0,
      size: parseInt(event.target.value, 10),
      query: query,
    });
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
                  <TableCell key={header}>
                    {header}
                  </TableCell>
                ))}
                <TableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <Row
                  key={row.id}
                  row={row}
                  idx={index}
                  lastIdx={rows.length - 1}
                  handleClick={(event, str) => handleClick(event, str)}
                  selected={isSelected(row.id!)}
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
