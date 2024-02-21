import {
  Box,
  Button,
  Card,
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
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";
import React from "react";

interface ButtonSettings {
  label: string;
  onClick: () => void;
}

interface Pagination {
  rowsPerPage: number;
  rowsPerPageOptions: number[];
}

export interface RowData {
  columns: string[];
  description?: string;
}

interface Table {
  title: string;
  headers: string[];
  rows: RowData[];
  actionButton?: ButtonSettings;
  showDescription?: boolean;
  pagination?: Pagination;
}
//styles to override padding none in cell
export default function AttacksTable(props: Table) {
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
    const { row, idx, lastIdx } = props;
    const [open, setOpen] = useState(false);

    return (
      <React.Fragment>
        <TableRow
          key={idx}
          sx={[ open && { "& > *": { borderBottom: 0 } }, (idx === lastIdx) && { "& > *": { borderBottom: 0 } } ]}
        >
          <>
            {row.columns.map((col) => (
              <TableCell component="th" scope="row">
                <Typography variant="body2">{col}</Typography>
              </TableCell>
            ))}
          </>
          {row.description && (
            <TableCell align="right" padding="checkbox">
              <IconButton
                sx={{ mr: 1 }}
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
          )}
        </TableRow>
        <TableRow sx={[!open && { "& > *": { borderBottom: 0 } }]}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box py={2}>
                <Typography variant="body2" gutterBottom component="div">
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
    <Card elevation={2} sx={{ flexGrow: 1 }}>
      <CardHeader
        title={props.title}
        action={props.actionButton ? <Button variant="contained">Add attack</Button> : null}
      ></CardHeader>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {
              props.headers.map((header) => (
                <TableCell>{header}</TableCell>))
              }
              {props.showDescription && <TableCell></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, idx) => (
                <Row row={row} key={idx} idx={idx} lastIdx={props.rows.length - 1} />
              ))}
          </TableBody>
        </Table>
        {props.pagination && (
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={props.rows.length}
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
