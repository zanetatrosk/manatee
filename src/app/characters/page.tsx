"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { Button, CardActions, CardMedia, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

function CharacterCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
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
              sx={{ mx: 1 }}
            >
              DELETE
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
export default function MultiActionAreaCard() {
  return (
    <Container
      sx={{
        justifyContent: "right",
        mt: 4,
        pr: 3,
      }}
    >
      <Grid
        xs
        container
        direction="row"
        sx={{
          justifyContent: "right",
          mb: 4,
          pr: 3,
        }}
      >
        <Button variant="outlined" size="small">
          create character +
        </Button>
      </Grid>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1, sm: 8, md: 12 }}
      >
        {Array.from(Array(6)).map((_, index) => (
          <Grid xs={2} sm={4} key={index}>
            <CharacterCard />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
