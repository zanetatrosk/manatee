import {
  Box, Card,
  CardHeader,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import React from "react";



interface Pagination {
  rowsPerPage: number;
  rowsPerPageOptions: number[];
}

export interface RowData {
  id?: string;
  columns: string[];
  description?: string;
}

export interface TableWrap {
  title: string;
  headers: string[];
  rows: RowData[];
  actionButton?: React.ReactNode;
  showDescription?: boolean;
  pagination?: Pagination;
  scrollable?: boolean;
}

//styles to override padding none in cell
export default function CrudTable({title, headers, rows, actionButton, showDescription, pagination, scrollable}: TableWrap) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  function handleChangePage(event: unknown, page: number): void {
    setPage(page);
    console.log(page);
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  function Row(props: { row: RowData; idx: number; lastIdx: number }) {
    const { row, idx } = props;
    const [open, setOpen] = useState(false);

    return (
      <React.Fragment>
        <TableRow
          key={idx}
          sx={[ open && { "& > *": { borderBottom: 0 } } ]}
        >
          <>
            {row.columns.map((col) => (
              <TableCell component="th" scope="row">
                <Typography variant="body2">{col}</Typography>
              </TableCell>
            ))}
          {row.description && (
            <TableCell sx={[open && {borderBottom: 0}]} component="th" scope="row" align="right" padding="checkbox">
              <IconButton
                sx={{ mr: 1 }}
                size="small"
                onClick={() => setOpen(!open)}
                >
                {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
          )}
          </>
        </TableRow>
        <TableRow sx={[!open && { "& > *": { borderBottom: 0 } }]}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit >
              <Box py={2} display="flex" flexGrow={1} sx={{ overflow: 'auto' }}>
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
  
  return (
    <Box display="flex" flexGrow={1}>
    <Card elevation={2} sx={{flexGrow: 1, ...(!!scrollable && {overflow: 'hidden'})}}>
      <CardHeader
        title={title}
        action={actionButton}
      ></CardHeader>
      <TableContainer sx={{ ...(!!scrollable && {maxHeight: 155}) }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              {
              headers.map((header) => (
                <TableCell>{header}</TableCell>))
              }
              {showDescription && <TableCell></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .map((row, idx) => (
                <Row row={row} key={idx} idx={idx} lastIdx={rows.length - 1} />
              ))}
          </TableBody>
        </Table>
        {pagination && (
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </TableContainer>
    </Card>
    </Box>
  );
}
