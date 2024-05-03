import CreateCharacterStepper from "@features/characterStepper/characterStepper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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
