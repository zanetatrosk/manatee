import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, useMediaQuery, useTheme } from "@mui/material";
import { Button, CardActions, CardMedia } from "@mui/material";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { CHARACTERS } from "constants/characterDefinition";
import {
  useDeleteCharacterMutation,
  useGetCharactersQuery,
} from "api/charactersApiSlice";
import ConfirmationDialog from "@components/confirmationDialog";
import Spinner from "@components/spinner";
import { CharacterInfo } from "definitions/characterSheet";
import noImage from "assets/images/no-image.png";
import PATHS from "constants/path";

function CharacterCard({ props }: { props: CharacterInfo }) {
  let navigate = useNavigate();

  const [deleteCharacter] = useDeleteCharacterMutation();
  const [open, setOpen] = React.useState(false);

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <Card sx={{ width: "100%" }} data-cy="character-card">
      <CardActionArea
        onClick={() => navigate(PATHS.CHARACTER_SHEET + "/" + props.id)}
      >
        <CardMedia
          sx={{ maxHeight: 160 }}
          component="img"
          image={props.info.cardPhotoUrl || noImage}
          title="character"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.info.characterName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.info.race.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container direction="row" justifyContent="flex-start">
          <Grid item xs>
            <Button
              variant="outlined"
              size="small"
              sx={{ mx: 1 }}
              onClick={() => {
                navigate(PATHS.CHARACTER_SHEET + "/" + props.id);
              }}
            >
              {CHARACTERS.VIEW}
            </Button>
          </Grid>
          <Grid>
            <Button
              variant="outlined"
              size="small"
              color="error"
              sx={{ mr: 1 }}
              onClick={() => {
                setOpen(true);
              }}
            >
              {CHARACTERS.DELETE}
              <ConfirmationDialog
                title="Delete character"
                description={`Are you sure you want to delete character ${props.info.characterName}?`}
                openDialog={open}
                confirmAction={() => {
                  deleteCharacter(props.id);
                  closeDialog();
                }}
                closeDialog={closeDialog}
              />
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}

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
