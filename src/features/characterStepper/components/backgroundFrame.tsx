import CardInfo from "@components/cardInfo";
import MultiComplete from "@components/customMultiComplete";
import { Background, Sourceable } from "@definitions/characterForm";
import { BackgroundForm, StepperForm } from "@definitions/stepperForm";
import {
  Box,
  Grid,
  Typography,
  Autocomplete,
  TextField,
  CircularProgress,
  Divider,
} from "@mui/material";
import {
  useGetBackgroundsQuery,
  useGetLanguagesQuery,
  useGetToolsQuery,
} from "api/generalContentApiSlice";
import { CREATE_CHARACTER } from "constants/characterDefinition";
import React, { useEffect, useState } from "react";

const BACKGROUND = CREATE_CHARACTER.BACKGROUND;

export default function BackgroundFrame({
  backgroundForm,
  setForm,
  sourceIds,
}: {
  backgroundForm: BackgroundForm;
  setForm: React.Dispatch<React.SetStateAction<StepperForm>>;
  sourceIds: string[];
}) {
  const { data: backgrounds, isLoading: loadingBackgrounds } =
    useGetBackgroundsQuery(sourceIds);
  const { data: languages } =
    useGetLanguagesQuery(sourceIds);
  const { data: tools } = useGetToolsQuery(sourceIds);
  const [background, setBackground] = useState<Background | null>(null);

  useEffect(() => {
    if (backgrounds && backgroundForm.id && !background) {
      const backgroundTmp = backgrounds?.content.find(
        (b) => b.id === backgroundForm.id,
      );
      if (backgroundTmp) {
        setBackground(backgroundTmp);
      }
    }
  }, [backgrounds, backgroundForm.id, background]);

  const setPropertyInForm = (property: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      background: { ...prev.background, [property]: value },
    }));
  };

  const handleToolsChange = (value: Sourceable[]): void => {
    setPropertyInForm(
      "toolIds",
      value.map((v) => v.id),
    );
  };

  const handleLanguagesChange = (value: Sourceable[]): void => {
    setPropertyInForm(
      "languageIds",
      value.map((v) => v.id),
    );
  };

  return (
    <Box>
      <Grid container direction="column" pb={2}>
        <Grid item>
          <Typography gutterBottom variant="h4" component="div">
            {BACKGROUND.HEADING}
          </Typography>
        </Grid>
        <Grid item>
          {!background && (
            <Typography gutterBottom variant="body2" color="text.secondary">
              {BACKGROUND.SUBTITLE}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item lg={7} xs={12}>
          <Autocomplete
            options={backgrounds?.content || []}
            value={background?.id ? background : null}
            getOptionLabel={(option) => option.name}
            sx={{ my: 2 }}
            onChange={(_, value) => {
              if (!value) return;
              const toolIds = value.toolProficiencies.defaults.map((t) => t.id);
              const languageIds = value.languageProficiencies.defaults.map(
                (l) => l.id,
              );
              setForm((prev) => ({
                ...prev,
                background: {
                  id: value.id,
                  toolIds: toolIds,
                  languageIds: languageIds,
                  source: value.source.id,
                },
              }));
              setBackground(value);
            }}
            data-cy="background"
            renderInput={(params) => (
              <TextField
                {...params}
                id="input"
                label={BACKGROUND.HEADING}
                variant="filled"
                placeholder={BACKGROUND.PLACEHOLDER}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loadingBackgrounds ? (
                        <CircularProgress color="inherit" size={23} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        </Grid>
      </Grid>
      <React.Fragment>
        {!!background && (
          <div>
            <Box>
              <Divider sx={{ py: 2 }}>
                <Typography variant="overline" display="block" gutterBottom>
                  {CREATE_CHARACTER.CARD_ACTIONS.FURTHER_INFO}
                </Typography>
              </Divider>
            </Box>
            <Grid container sx={{ py: 2 }} columnSpacing={8}>
              {background.languageProficiencies.amount !== 0 && (
                <Grid item lg={6} xs={12} sx={{ py: 2 }}>
                  <MultiComplete
                    values={languages?.content || []}
                    results={
                      languages?.content.filter((l) =>
                        backgroundForm.languageIds.includes(l.id),
                      ) || []
                    }
                    data_cy="languages"
                    onChange={handleLanguagesChange}
                    label={BACKGROUND.LANGUAGES}
                    helpText={
                      BACKGROUND.MESSAGE +
                      `${background.languageProficiencies.amount} ` +
                      BACKGROUND.LANGUAGES.toLowerCase()
                    }
                    placeholder={BACKGROUND.LANGUAGES_PLACEHOLDER}
                    maxItems={background.languageProficiencies.amount}
                  />
                </Grid>
              )}
              <Grid item lg={6} xs={12} sx={{ py: 2 }}>
                <MultiComplete
                  values={tools?.content || []}
                  results={
                    tools?.content.filter((t) =>
                      backgroundForm.toolIds.includes(t.id),
                    ) || []
                  }
                  data_cy="tools"
                  onChange={handleToolsChange}
                  label={BACKGROUND.PROF_TOOLS}
                  helpText={
                    BACKGROUND.MESSAGE +
                    `${background.toolProficiencies.amount} ` +
                    BACKGROUND.TOOLS.toLowerCase()
                  }
                  placeholder={BACKGROUND.TOOLS_PLACEHOLDER}
                  maxItems={background.toolProficiencies.amount}
                />
              </Grid>
            </Grid>
            <Box>
              <CardInfo
                title={background.name}
                features={background.features}
                description={background.description}
              />
            </Box>
          </div>
        )}
      </React.Fragment>
    </Box>
  );
}
