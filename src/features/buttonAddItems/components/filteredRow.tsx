import { RowData } from "@components/crudTable";
import { TableRow, TableCell, Radio, Checkbox, Typography, IconButton, Collapse, Box } from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function FilteredRow(props: {
    row: RowData;
    idx: number;
    lastIdx: number;
    handleClick: (id: string) => void;
    selected: boolean;
    singleChoice?: boolean;
  }) {
    const { row, idx, selected, singleChoice } = props;
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
              {singleChoice ? (
                <Radio
                  color="primary"
                  checked={selected}
                  onChange={() => {
                    props.handleClick(row.id!);
                  }}
                />
              ) : (
                <Checkbox
                  color="primary"
                  checked={selected}
                  onClick={() => {
                    props.handleClick(row.id!);
                  }}
                />
              )}
            </TableCell>
            {row.columns.map((col) => (
              <TableCell component="th" scope="row" key={col}>
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
          <TableCell
            style={{ paddingBottom: 0, paddingTop: 0 }}
            colSpan={6}
            sx={[!open && { "& > *": { borderTop: 0 } }]}
          >
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