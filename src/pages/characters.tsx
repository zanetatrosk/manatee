import Typography from "@mui/material/Typography";
import { useMediaQuery, useTheme } from "@mui/material";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { CHARACTERS } from "constants/characterDefinition";
import {
  useGetCharactersQuery
} from "api/charactersApiSlice";
import Spinner from "@components/spinner";
import PATHS from "constants/paths";
import CharacterCard from "@features/characters/characterCard";


export default function Characters() {
  let navigate = useNavigate();
  const theme = useTheme();
  const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"));
  const { data: characters, isLoading } = useGetCharactersQuery();
  return (
    <Grid container flexDirection={"column"}>
      <Grid container item alignItems={"center"}>
        <Grid container item xs={12} sm={12} md={6} lg={4} p={3}>
          <Typography variant="h4">{CHARACTERS.HEADING}</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md="auto" lg={4} />
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={6}
          lg={4}
          p={3}
          justifyContent={greaterThanMid ? "flex-end" : "flex-start"}
        >
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              navigate(PATHS.CREATE_CHARACTER);
            }}
            fullWidth={!greaterThanMid}
            endIcon={<AddIcon />}
            sx={{
              px: 4,
              py: 1,
            }}
          >
            {CHARACTERS.CREATE_CHARACTER}
          </Button>
        </Grid>

        {isLoading ? (
          <Spinner />
        ) : (
          characters?.map((character, index) => (
            <Grid
              item
              container
              xs={12}
              sm={12}
              md={6}
              lg={4}
              key={index}
              justifyContent="center"
              p={3}
            >
              <CharacterCard props={character} />
            </Grid>
          ))
        )}
      </Grid>
    </Grid>
  );
}
