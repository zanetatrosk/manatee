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
    <Card sx={{ maxWidth: 345, width: "90%", minWidth: 340 }}>
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


export default function MultiActionAreaCard() {
  return (
    <Container
      sx={{
        mt: 4,
      }}
    >
      <Grid container>
        {/* <Grid
          xs={2}
          container
          sx={{
            justifyContent: "center",
            mb: 2,
            mt: 7,
            display: { xs: "flex", md: "none" },
          }}
        >
          <Button variant="outlined" size="small" sx={{ width: 345 }}>
            create character +
          </Button>
        </Grid> */}
        {Array.from(Array(6)).map((_, index) => (
            <Grid
              xs={12}
              sm={12}
              md={6}
              lg={4}
              p={3}
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
