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
import {
  Ability,
  AbilityScore,
} from "@pages/Characters/definitions/characterForm";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooksStore";

const MIN = 1;
const MAX = 20;
const BASE_10 = 10;
const DEFAULT_SCORE = 8;
const MAX_POINTS = 27;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    ...theme.typography.button,
  },
}));
//implement point buy todo

const StyledModifier = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    ...theme.typography.h4,
  },
}));
function setModifiersValues(row: AbilityScore): number {
  //return score with counted modifiers due to variable upToOne and upToTwo
  let modifier = Math.floor((row.score - 10) / 2);
  if (row.modifierUpToOne) modifier++;
  if (row.modifierUpToTwo) modifier+=2;
  return modifier;
}
export default function Abilities() {
  const race = useAppSelector((state) => state.character.race);
  const [rows, setRows] = React.useState<AbilityScore[]>(createData());
  const [points, setPoints] = React.useState<number>(0);
  function createData(): AbilityScore[] {
    const keys = Object.keys(Ability);
    let newArray = [] as AbilityScore[];
    keys.map((ability: string) => {
      let upToOne = false;
      let upToTwo = false;
      if (
        typeof race?.abilityScorePlus1?.find((ab) => ab === ability) !==
        "undefined"
      )
        upToOne = true;
      if (
        typeof race?.abilityScorePlus2?.find((ab) => ab === ability) !==
        "undefined"
      )
        upToTwo = true;
      newArray.push({
        label: ability,
        score: DEFAULT_SCORE,
        modifierUpToOne: upToOne,
        modifierUpToTwo: upToTwo,
      });
    });
    return newArray;
  }
  return (
    <TableContainer component={Card}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Abilities
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Used points {points}/{MAX_POINTS}
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
              key={row.label}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell>{row.label}</StyledTableCell>
              <TableCell align="left" sx={{ maxWidth: 151 }}>
                <TextField
                  id="outlined-number"
                  type="number"
                  value={row.score}
                  inputProps={{ min: MIN, max: MAX }}
                  onChange={(e) => {
                    let value = parseInt(e.target.value, BASE_10);
                    if (value > MAX) value = MAX;
                    if (value < MIN) value = MIN;
                    row.score = value;
                    const newRows = [...rows];
                    setRows(newRows);
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </TableCell>
              <StyledModifier align="left">
                {setModifiersValues(row)}
              </StyledModifier>
              <TableCell>
                <Checkbox
                  checked={row.modifierUpToOne}
                  onChange={() => {
                    row.modifierUpToOne = !row.modifierUpToOne;
                    const newRows = [...rows];
                    setRows(newRows);
                  }}
                  color="primary"
                />
              </TableCell>
              <TableCell>
                <Checkbox
                  checked={row.modifierUpToTwo}
                  onChange={() => {
                    row.modifierUpToTwo = !row.modifierUpToTwo;
                    const newRows = [...rows];
                    setRows(newRows);
                  }}
                  color="primary"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
