import { CharacterSheet } from "@definitions/characterSheet";
import { returnDefaults } from "@definitions/defaults";
import { StepperForm } from "@definitions/stepperForm";
import {
  Box,
  Stepper,
  Typography,
  Step,
  StepButton,
  Button,
  Tooltip,
} from "@mui/material";
import {
  useAddCharacterMutation,
  usePutCharacterMutation,
} from "api/charactersApiSlice";
import {
  CREATE_CHARACTER,
  ERROR_MESSAGES,
} from "constants/characterDefinition";
import React from "react";
import { useNavigate } from "react-router-dom";
import Abilities from "./components/abilitiesFrame";
import BasicInformation from "./components/basicInformationFrame";
import Background from "./components/backgroundFrame";
import Race from "./components/raceFrame";
import Class from "./components/classFrame";

const steps = [
  CREATE_CHARACTER.BASIC_INFO.HEADING,
  CREATE_CHARACTER.CLASS.HEADING,
  CREATE_CHARACTER.RACE.HEADING,
  CREATE_CHARACTER.ABILITIES.HEADING,
  CREATE_CHARACTER.BACKGROUND.HEADING,
];

interface ComponentRegister {
  id: number;
  component: React.ReactElement;
}

export default function CreateCharacterStepper({
  character,
}: {
  character?: StepperForm;
}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate();
  const [postCharacter] = useAddCharacterMutation();
  const [putCharacter] = usePutCharacterMutation();
  const [form, setData] = React.useState<StepperForm>(() => {
    if (character) {
      return character;
    }
    return returnDefaults();
  });
  const components: ComponentRegister[] = [
    {
      id: 0,
      component: <BasicInformation form={form.info} setForm={setData} />,
    },
    {
      id: 1,
      component: (
        <Class
          classForm={form.class}
          setForm={setData}
          sourceIds={form.info.sourceIds}
        />
      ),
    },
    {
      id: 2,
      component: (
        <Race
          raceForm={form.race}
          setForm={setData}
          sourceIds={form.info.sourceIds}
        />
      ),
    },
    {
      id: 3,
      component: (
        <Abilities abilitiesForm={form.abilityScores} setForm={setData} />
      ),
    },
    {
      id: 4,
      component: (
        <Background
          backgroundForm={form.background}
          setForm={setData}
          sourceIds={form.info.sourceIds}
        />
      ),
    },
  ];

  const isStepOptional = (step: number) => {
    return step === 0;
  };


  const canFinish = () => {
    return !!(form.class.id && form.race.id && form.background.id);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = () => {
    const tmpForm = {
      ...form,
      abilityScores: form.abilityScores.map((a) => ({
        ...a,
        label: a.label.toLowerCase(),
      })),
    };
    if (tmpForm.id) {
      putCharacter(tmpForm)
        .unwrap()
        .then((res: CharacterSheet) => {
          navigate("/characters/character-sheet/" + res.id);
        });
      return;
    }
    postCharacter(tmpForm)
      .unwrap()
      .then((res: CharacterSheet) => {
        navigate("/characters/character-sheet/" + res.id);
      });
  };

  return (
    <Box>
      <Stepper nonLinear activeStep={activeStep} sx={{ mb: 7 }}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">
                {CREATE_CHARACTER.CARD_ACTIONS.OPTIONAL}
              </Typography>
            );
          }
          return (
            <Step key={label} {...stepProps}>
              <StepButton
                color="inherit"
                onClick={handleStep(index)}
                {...labelProps}
              >
                {label}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>

      <React.Fragment>
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
          {steps.length - 1 !== activeStep && (
            <Button onClick={handleNext} data-cy={"next"}>
              {CREATE_CHARACTER.CARD_ACTIONS.NEXT}
            </Button>
          )}
          <Tooltip
            title={!canFinish() ? ERROR_MESSAGES.CHARACTER_CREATE_MESSAGE : ""}
          >
            <span>
              <Button
                onClick={handleFinish}
                disabled={!canFinish()}
                data-cy={"finish"}
              >
                {CREATE_CHARACTER.CARD_ACTIONS.FINISH}
              </Button>
            </span>
          </Tooltip>
        </Box>
      </React.Fragment>
    </Box>
  );
}
