import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
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
