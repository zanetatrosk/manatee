import ConfirmationDialog from "@components/confirmationDialog";
import { CharacterInfo } from "@definitions/characterSheet";
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Grid, Button } from "@mui/material";
import { useDeleteCharacterMutation } from "api/charactersApiSlice";
import { CHARACTERS } from "constants/characterDefinition";
import PATHS from "constants/paths";
import React from "react";
import { useNavigate } from "react-router-dom";
import noImage from "@assets/images/no-image.png";


// Card component for displaying character information on characters page
export default function CharacterCard({ props }: { props: CharacterInfo }) {
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