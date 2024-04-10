import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import HorizontalLinearStepper from "../features/characterStepper/characterStepper";
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
