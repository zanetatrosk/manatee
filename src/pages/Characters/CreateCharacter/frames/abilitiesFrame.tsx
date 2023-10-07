import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Card"
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { TextField, Typography, CardContent } from "@mui/material";
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Strength", 159, 6.0, 24, 4.0),
  createData("Dexterity", 237, 9.0, 37, 4.3),
  createData("constitution", 262, 16.0, 24, 6.0),
  createData("Intelligence", 305, 3.7, 67, 4.3),
  createData("wisdom", 356, 16.0, 49, 3.9),
  createData("charisma", 356, 16.0, 49, 3.9),
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    ...theme.typography.button,
  },
}));

const StyledModifier = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    ...theme.typography.h4,
  },
}));

export default function Abilities() {
  return (
    <TableContainer component={Card}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Abilities
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Additional description if required
        </Typography>
      </CardContent>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Ability</TableCell>
            <TableCell align="left">Score</TableCell>
            <TableCell align="left">Modifier</TableCell>
            <TableCell align="left">Up&nbsp;+&nbsp;1</TableCell>
            <TableCell align="left">Up&nbsp;+&nbsp;2</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell >{row.name}</StyledTableCell>
              <TableCell align="left" sx={{ maxWidth:151}}>
                <TextField
                  id="outlined-number"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </TableCell>
              <StyledModifier align="left">{row.fat}</StyledModifier>
              <TableCell>
                <Checkbox color="primary" />
              </TableCell>
              <TableCell>
                <Checkbox color="primary" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
