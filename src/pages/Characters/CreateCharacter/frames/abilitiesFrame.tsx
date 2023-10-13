import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { TextField, Typography, CardContent } from "@mui/material";
import { Ability } from "@pages/Characters/definitions/characterForm";

const MIN = 1;
const MAX = 20;
const BASE_10 = 10;
const DEFAULT_SCORE = 8;
function createData(name: Ability, modifier: number) {
  return { name, modifier };
}

const rows = [
  createData(Ability.STRENGTH, -1),
  createData(Ability.DEXTERITY, -1),
  createData(Ability.CONSTITUTION, -1),
  createData(Ability.INTELLIGENCE, -1),
  createData(Ability.WISDOM, -1),
  createData(Ability.CHARISMA, -1),
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
  const [scores, setScores] = React.useState<number[]>([]);
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
          {rows.map((row, idx) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell>{row.name}</StyledTableCell>
              <TableCell align="left" sx={{ maxWidth: 151 }}>
                <TextField
                  id="outlined-number"
                  type="number"
                  value={scores[idx] || DEFAULT_SCORE}
                  inputProps={{ min: MIN, max: MAX }}
                  onChange={(e) => {
                    var value = parseInt(e.target.value, BASE_10);
                    if (value > MAX) value = MAX;
                    if (value < MIN) value = MIN;
                    let newValues = [...scores];
                    newValues[idx] = value;
                    setScores(newValues);
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </TableCell>
              <StyledModifier align="left">{row.modifier}</StyledModifier>
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
