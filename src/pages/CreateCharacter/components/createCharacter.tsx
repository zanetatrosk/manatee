import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import HorizontalLinearStepper from "./stepperComponent";
import React from "react";

export default function CreateCharacter() {
  return (
    <React.Fragment>
      <Card>
        <CardContent>
          <HorizontalLinearStepper />
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
