import { Card, Grid, Typography, styled } from "@mui/material";
import Box from "@mui/material/Box";
import { addPlusOrMinus } from "utils/textUtils";

const StyledModifier = styled(Box)({
  width: 82,
  height: 50,
  p: 2,
  borderRadius: "var(--none, 6px);",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  //set background color depending on theme
  // backgroundColor: "#F5F5F5",
  borderShadow: "none",
  border: "2px solid",
  elevation: 0,
});

const StyledAbilityScore = styled(Box)({
  width: 46,
  height: 32,
  p: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // backgroundColor: "#F5F5F5",
  border: "2px solid",
  elevation: 0,
  borderTop: "none",
  boxShadow: "none",
  WebkitBorderBottomLeftRadius: 7,
  WebkitBorderBottomRightRadius: 7,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  
});

interface AbilityCardProps {
    ability: string;
    score: number;
    modifier: number;
}

export default function AbilityCard(props: AbilityCardProps) {
  return (
    <Box>
      <Card sx={{ py: 1,  borderRadius: 2, width: 115, height: 130 }} >
        <Grid alignItems="center" container flexDirection="column" spacing={1}>
          <Grid item>
            <Typography variant="button">{props.ability}</Typography>
          </Grid>
          <Grid item container flexDirection="column" alignItems="center">
            <StyledModifier>
              <Typography variant="h4">{addPlusOrMinus(props.modifier)}</Typography>
            </StyledModifier>

            <StyledAbilityScore>
              <Typography variant="h6">{props.score}</Typography>
            </StyledAbilityScore>
          </Grid>
          
        </Grid>
      </Card>
    </Box>
  );
}
