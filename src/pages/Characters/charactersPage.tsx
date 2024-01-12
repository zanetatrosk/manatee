import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Button, CardActions, CardMedia } from "@mui/material";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { CHARACTERS } from "constants/characterDefinition";
import { useAppDispatch, useAppSelector } from "@hooks/hooksStore";
import { resetState } from "reducers/characterReducer";

function CharacterCard() {
  return (
    <Card sx={{ width: "100%" }} data-cy="character-card">
      <CardMedia
        sx={{ maxHeight: 160 }}
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
          <Grid item xs>
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
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Grid container flexDirection={"column"} component={Card} padding={4}>
      <Grid container item pt={4} alignItems={"center"}>
        <Grid container item xs={12} sm={12} md={6} lg={4} p={3}>
          <Typography variant="h4">My Characters</Typography>
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
              dispatch(resetState());
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

        {Array.from(Array(6)).map((index) => (
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
            <CharacterCard />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
