import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BasicInformation from "@pages/CreateCharacter/components/basicInformationFrame";
import Class from "@pages/CreateCharacter/components/classFrame";
import Race from "./raceFrame";
import Abilities from "./abilitiesFrame";
import Background from "./backgroundFrame";
import { CREATE_CHARACTER } from "constants/characterDefinition";
import { useNavigate } from "react-router-dom";
import { StepperForm } from "../definitions/stepperForm";
import { formDefaults } from "../definitions/defaults";

const steps = ["Basic information", "Class", "Race", "Abilities", "Background"];

interface ComponentRegister {
  id: number;
  component: React.ReactElement;
  form?: StepperForm;
  setForm?: React.Dispatch<React.SetStateAction<StepperForm>>;
}

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const navigate = useNavigate();

  const [form, setData] = React.useState<StepperForm>(formDefaults);



  React.useEffect(() => {
    console.log(form, "form was edited");
  }, [form]);
  const components: ComponentRegister[] = [
    { id: 0, component: <BasicInformation form={form} setForm={setData}/> },
    { id: 1, component: <Class classForm={form.class} setForm={setData}/> },
    { id: 2, component: <Race /> },
    { id: 3, component: <Abilities /> },
    { id: 4, component: <Background/> },
  ];
  const isStepOptional = (step: number) => {
    return step === 0;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleFinish = () => {
    navigate("/characters/character-sheet");
  };

  return (
    <Box>
      <Stepper activeStep={activeStep} sx={{ mb: 7 }}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          {/* <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography> */}

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          <Box sx={{ pt: 2, pb: 8, px: 8 }}>
            {components.at(activeStep)?.component}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              data-cy="back"
              sx={{ mr: 1 }}
            >
              {CREATE_CHARACTER.CARD_ACTIONS.BACK}
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                {CREATE_CHARACTER.CARD_ACTIONS.SKIP}
              </Button>
            )}
            <Button
              onClick={
                activeStep === steps.length - 1 ? handleFinish : handleNext
              }
              data-cy={activeStep === steps.length - 1 ? "finish" : "next"}
            >
              {activeStep === steps.length - 1
                ? CREATE_CHARACTER.CARD_ACTIONS.FINISH
                : CREATE_CHARACTER.CARD_ACTIONS.NEXT}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
