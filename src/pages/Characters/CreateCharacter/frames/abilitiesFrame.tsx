import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { TextField, Typography, CardContent, Radio, Checkbox } from "@mui/material";
import {
  Ability,
  AbilityScore,
} from "@pages/Characters/definitions/characterForm";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooksStore";
import { setAbilityScores } from "reducers/characterReducer";
import { useEffect } from "react";

const MIN = 1;
const MAX = 20;
const BASE_10 = 10;
const DEFAULT_SCORE = 8;
const MAX_POINTS = 27;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  
  [`&.${tableCellClasses.body}`]: {
    ...theme.typography.button,
  },
}));

const StyledModifier = styled(TableCell)(({ theme }) => ({
 
  [`&.${tableCellClasses.body}`]: {
    ...theme.typography.h4,
    
  },
}));
function setModifiersValues(row: AbilityScore): number {
  
  let modifier = Math.floor(((row.score + (row.modifierUpToOne ? 1 : 0) + (row.modifierUpToTwo ? 2 : 0)) - 10) / 2);
  return modifier;
}
export default function Abilities() {
  
  const { race, abilityScores } = useAppSelector((state) => state.character);
  const [rows, setRows] = React.useState<AbilityScore[]>(() => createData());
  const [points, setPoints] = React.useState<number>(0);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   console.log(rows, "rows");
  //   const tmpData = rows;
  //   dispatch(setAbilityScores(tmpData));
  // }
  // , [rows, dispatch]);
  function createData(): AbilityScore[] {
    return Object.keys(Ability).map((ability: string) => ({
      label: ability,
      score: DEFAULT_SCORE,
      modifierUpToOne: race?.abilityScorePlus1?.includes(ability) || false,
      modifierUpToTwo: race?.abilityScorePlus2?.includes(ability) || false,
    }));
  }
  return (
    <TableContainer component={Card}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Abilities
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {/* todo implement point buy */}
          Used points {points}/{MAX_POINTS} 
        </Typography>
      </CardContent>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Ability</TableCell>
            <TableCell align="center">Score</TableCell>
            <TableCell align="center">Modifier</TableCell>
            <TableCell align="center">Up&nbsp;+&nbsp;1</TableCell>
            <TableCell align="center">Up&nbsp;+&nbsp;2</TableCell>
            <TableCell align="center">Total score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow
              key={row.label}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell align="center">{row.label}</StyledTableCell>
              <TableCell align="center" size="small">
                <TextField
                  id="outlined-number"
                  type="number"
                 
                   value={row.score}
                  inputProps={{ min: MIN, max: MAX }}
                  onChange={(e) => {
                    let value = parseInt(e.target.value, BASE_10);
                    //this is to prevent NaN
                    if(value !== value) value = MIN;
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
              <StyledModifier align="center">
                {setModifiersValues(row)}
              </StyledModifier>
              <StyledModifier align="center">
                <Checkbox
                  checked={row.modifierUpToOne && !row.modifierUpToTwo}
                  onChange={() => { 
                    row.modifierUpToOne = !row.modifierUpToOne;
                    const newRows = [...rows];
                    setRows(newRows);
                  }}
                  value={row.modifierUpToOne}
                  disabled={row.modifierUpToTwo}
                />
              </StyledModifier>
              <StyledModifier align="center">
                <Checkbox
                  value={row.modifierUpToTwo}
                  checked={row.modifierUpToTwo && !row.modifierUpToOne}
                  onChange={() => { 
                    row.modifierUpToTwo = !row.modifierUpToTwo;
                    const newRows = [...rows];
                    setRows(newRows);
                  }}
                  disabled={row.modifierUpToOne}
                />
              </StyledModifier>
              <StyledModifier align="center">
                {row.score + (row.modifierUpToOne ? 1 : 0) + (row.modifierUpToTwo ? 2 : 0)}
              </StyledModifier>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}



