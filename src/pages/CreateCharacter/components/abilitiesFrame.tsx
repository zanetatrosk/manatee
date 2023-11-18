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
import {
  TextField,
  Typography,
  CardContent,
  Checkbox,
  Box,
} from "@mui/material";
import {
  AbilityScore,
} from "@pages/CreateCharacter/definitions/characterForm";
import { useAppDispatch, useAppSelector } from "@hooks/hooksStore";
import { setAbilityScores } from "reducers/characterReducer";
import { useEffect } from "react";
import {CREATE_CHARACTER} from "constants/characterDefinition";

//declaring constants
const MIN = 1;
const MAX = 20;
const BASE_10 = 10;
const headers = ["Ability", "Score", "Modifier", "Up +1", "Up +2", "Total score"];
const ABILITIES = CREATE_CHARACTER.ABILITIES;

//styling
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

//function that sets the score to the correct value
function setScore(value: number) {
  //this is to prevent NaN
  // eslint-disable-next-line
  if (value !== value) value = MIN;
  value < MIN ? (value = Math.max(value, MIN)) : (value = Math.min(value, MAX));
}

//function that calculates the full score
function calculateFullScore(row: AbilityScore): number {
  let score = row.score;
  if (row.modifierUpToOne) score += 1;
  if (row.modifierUpToTwo) score += 2;
  return Math.min(score, MAX);
}

//function that calculates the modifier
function setModifiersValues(row: AbilityScore): number {
  return Math.floor((calculateFullScore(row) - 10) / 2);
}
export default function Abilities() {
  const { abilityScores } = useAppSelector((state) => state.character);
  const dispatch = useAppDispatch();

  //deep copy of abilityScores from store
  const [rows, setRows] = React.useState<AbilityScore[]>(
    abilityScores.map((row) => ({ ...row }))
  );
  /*this is called every time some value in rows changes
  it is unoptimized, in future todo optimize*/
  useEffect(() => {
    console.log(rows, "rows");
    //do a deep copy of row
    const a = rows.map((row) => ({ ...row }));
    dispatch(setAbilityScores(a));
  }, [rows, dispatch]);

  //setting the row with new values
  const setRow = (idx: number, param: string, value: number | boolean) => {
    const newRows = [...rows];
    newRows[idx] = { ...rows[idx], [param]: value };
    setRows(newRows);
  };


  return (
    <Box>
      <TableContainer component={Card}>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {ABILITIES.HEADING}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {/* todo implement point buy */}
            {ABILITIES.SUBTITLE}
          </Typography>
        </CardContent>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              { headers.map((header) => (
                <StyledTableCell align="center" key={header} >{header}</StyledTableCell>
              )) }
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
                      let value = parseInt(e.target.value, BASE_10) as number;
                      setScore(value);
                      setRow(idx, "score", value);
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
                      setRow(idx, "modifierUpToOne", !row.modifierUpToOne);
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
                      setRow(idx, "modifierUpToTwo", !row.modifierUpToTwo);
                    }}
                    disabled={row.modifierUpToOne}
                  />
                </StyledModifier>
                <StyledModifier align="center">
                  {calculateFullScore(row)}
                </StyledModifier>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
