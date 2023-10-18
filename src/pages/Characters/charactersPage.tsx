import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import {
  Button,
  CardActions,
  CardMedia,
  Box,
  CardActionArea,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
function CharacterCard() {
  return (
    <Card sx={{ maxWidth: 370 }}>
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
        <Grid container direction="row" justifyContent="flex-start" >
          <Grid item={true} xs>
            <Button variant="outlined" size="small" sx={{ mx: 1 }}>
              VIEW
            </Button>
            <Button variant="outlined" size="small">
              EDIT
            </Button>
          </Grid>
          <Grid>
            <Button
              variant="outlined"
              size="small"
              color="error"
              sx={{ mr: 1 }}
            >
              DELETE
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
    <Container
      maxWidth="lg"
    >
      <Grid container>
        <Grid item
          xs={12}
          pr={3}
          container
          justifyContent="flex-end"
        >
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
            create character
          </Button>
        </Grid>
        {Array.from(Array(6)).map((_, index) => (
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
            <CharacterCard/>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
