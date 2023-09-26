import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { Button, CardActions, CardMedia } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
function CharacterCard() {
  return (
    <Card sx={{ maxWidth: 385, minWidth: 345, mx: 5 }}>
      <CardMedia
        sx={{ maxHeight: 140 }}
        component="img"
        // Picture by pixabay: https://pixabay.com/cs
        src="https://cdn.pixabay.com/photo/2023/06/10/02/04/digital-art-8052936_960_720.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lianna
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Half Elf
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container direction="row" justifyContent="flex-start" xs={12}>
          <Grid xs container direction="row">
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
      sx={{
        mt: 7,
      }}
      fixed
    >
      <Grid container columnSpacing={{  md: 6 }} >
        <Grid
          xs={12}
          sm={10}
          md={12}
          lg={12}
          p={2}
          display="flex"
          justifyContent="right"
          alignItems="right"
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
      </Grid>
      <Grid container rowSpacing={2}  columnSpacing={{  md: 10 }}>
        {Array.from(Array(6)).map((_, index) => (
          <Grid
            xs={12}
            sm={12}
            md={6}
            lg={4}
            p={4}
            key={index}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CharacterCard />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
