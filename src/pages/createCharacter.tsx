import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CreateCharacterStepper from "../features/characterStepper/characterStepper";
import React from "react";

export default function CreateCharacter() {
  return (
    <React.Fragment>
      <Card>
        <CardContent>
          <CreateCharacterStepper />
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
