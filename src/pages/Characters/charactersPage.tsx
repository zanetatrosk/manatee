import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { Button, CardActions, CardMedia } from "@mui/material";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { CHARACTERS } from "constants/characterDefinition";

function CharacterCard() {
  return (
    <Card sx={{ maxWidth: 370 }} data-cy="character-card">
      <CardMedia
        sx={{ maxHeight: 140, minWidth: 350 }}
        component="img"
        // Picture by pixabay: https://pixabay.com/cs
        src="https://cdn.pixabay.com/photo/2023/06/10/02/04/digital-art-8052936_960_720.jpg"
        title="character"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lianna
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Half Elf
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container direction="row" justifyContent="flex-start">
          <Grid item={true} xs>
            <Button variant="outlined" size="small" sx={{ mx: 1 }}>
              {CHARACTERS.VIEW}
            </Button>
            <Button variant="outlined" size="small">
              {CHARACTERS.EDIT}
            </Button>
          </Grid>
          <Grid>
            <Button
              variant="outlined"
              size="small"
              color="error"
              sx={{ mr: 1 }}
            >
              {CHARACTERS.DELETE}
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}

export default function Characters() {
  let navigate = useNavigate();
  return (
    <Grid container>
      <Grid container xs={12} sx={{px: 3, mb: 1}}>
        <Grid item>
          <Typography variant="h4">My Characters</Typography>
        </Grid>
        <Grid item xs container justifyContent="flex-end">
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              navigate("/characters/create-character");
            }}
            endIcon={<AddIcon />}
            sx={{
              px: 4,
              py: 1,
            }}
          >
            {CHARACTERS.CREATE_CHARACTER}
          </Button>
        </Grid>
      </Grid>
      {Array.from(Array(6)).map((index) => (
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={4}
          p={3}
          key={index}
          justifyContent="center"
        >
          <CharacterCard />
        </Grid>
      ))}
    </Grid>
  );
}
