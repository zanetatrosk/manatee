import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import HorizontalLinearStepper from "./stepperComponent";
export default function CreateCharacter() {
  return (
    <Container maxWidth="lg">
        <Card>
          <CardContent>
            <HorizontalLinearStepper />
          </CardContent>
        </Card>
        </Container>
  );
}
