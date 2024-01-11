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
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import React from "react";

function createData(name: string, calories: number, fat: number) {
  return { name, calories, fat };
}
function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <TableRow key={row.name} sx={[ open && { "& > *": { borderBottom: "unset" } }]}>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>{row.calories}</TableCell>
        <TableCell>{row.fat}</TableCell>
        <TableCell align="right">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow sx={[ !open && { "& > *": { borderBottom: "unset" } }]}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box py={2}>
              <Typography variant="body2" gutterBottom component="div">
                lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow> 
    </React.Fragment>
  );
}

export default function AttacksTable() {
  //generate data as dnd attacks
  const rows = [
    createData("Attack 1", 159, 6.0),
    createData("Attack 2", 237, 9.0),
    createData("Attack 3", 262, 16.0),
    createData("Attack 4", 305, 3.7),
    createData("Attack 5", 356, 16.0),
  ];

  return (
    <Card>
      <CardHeader
        title="Attacks"
        action={<Button variant="contained">Add attack</Button>}
      ></CardHeader>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Attack bonus</TableCell>
            <TableCell>Damage type</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row row={row} key={row.name} />
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
