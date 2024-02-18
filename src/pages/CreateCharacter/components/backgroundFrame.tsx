import * as React from "react";
import {
  Box,
  Autocomplete,
  Divider,
  Grid,
  CircularProgress,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import MultiComplete from "@components/customMultiComplete";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import {
  Background,
  AutocompleteItem,
  Source,
} from "@pages/CreateCharacter/definitions/characterForm";
import CardInfo from "./cardInfo";
import { useAppDispatch, useAppSelector } from "@hooks/hooksStore";
import { setBackground as setBackgroundStore } from "reducers/characterReducer";
import { CREATE_CHARACTER } from "constants/characterDefinition";
import {
  useGetBackgroundsQuery,
  useGetLanguagesQuery,
  useGetToolsQuery,
} from "api/raceApiSlice";
import { BackgroundForm, StepperForm } from "../definitions/stepperForm";

const BACKGROUND = CREATE_CHARACTER.BACKGROUND;

export default function BackgroundFrame({ backgroundForm, setForm }: { backgroundForm: BackgroundForm, setForm: React.Dispatch<React.SetStateAction<StepperForm>> }) {
  

  
    const { data: backgrounds, isLoading: loadingBackgrounds } =
      useGetBackgroundsQuery(
        useAppSelector((state) => state.character.basicInfo.sources).map(
          (s: Source) => s.abbreviation
        )
      );
    const { data: languages, isLoading: loadingLanguages } = useGetLanguagesQuery(
      useAppSelector((state) => state.character.basicInfo.sources).map(
        (s: Source) => s.abbreviation
      )
    );
    const { data: tools, isLoading: loadingTools } = useGetToolsQuery(
      useAppSelector((state) => state.character.basicInfo.sources).map(
        (s: Source) => s.abbreviation
      )
    );

  const [isVisible, setVisibility] = React.useState(!!backgroundForm.id);
  const [background, setBackground] = useState<Background>(backgrounds?.find((b) => b.id === backgroundForm.id) || ({} as Background));

  const setPropertyInForm = (property: string, value: any) => {
    setForm(prev => ({...prev, background: {...prev.background, [property]: value}}));
  };

  const handleToolsChange = (value: AutocompleteItem[]): void => {
    setPropertyInForm("toolsId", value.map((v) => v.id));
    debugger;
  };

  const handleLanguagesChange = (value: AutocompleteItem[]): void => {
    setPropertyInForm("languagesId", value.map((v) => v.id));
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
          {!isVisible && (
            <Typography gutterBottom variant="body2" color="text.secondary">
              {BACKGROUND.SUBTITLE}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item lg={7} xs={12}>
          <Autocomplete
            options={backgrounds || []}
            value={background?.id ? background : null}
            getOptionLabel={(option) => option.name}
            sx={{ my: 2 }}
            onChange={(_, value) => {
              if (!value) return;
              setVisibility(true);
              setPropertyInForm("id", value.id);
              handleLanguagesChange(value.languageProficiencies.defaults);
              handleToolsChange(value.toolProficiencies.defaults);
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
        {isVisible && (
          <div>
            <Box>
              <Divider sx={{ py: 2 }}>
                <Typography variant="overline" display="block" gutterBottom>
                  {CREATE_CHARACTER.CARD_ACTIONS.FURTHER_INFO}
                </Typography>
              </Divider>
            </Box>
            <Grid container sx={{ py: 2 }} columnSpacing={8}>
              <Grid item lg={6} xs={12} sx={{ py: 2 }}>
                <MultiComplete
                  values={languages || []}
                  results={languages?.filter((l) => backgroundForm.languagesId.includes(l.id)) || []}
                  data_cy="languages"
                  onChange={handleLanguagesChange}
                  label={BACKGROUND.LANGUAGES}
                  helpText={`You can have up to ${background.languageProficiencies.amount} languages`}
                  placeholder={BACKGROUND.LANGUAGES_PLACEHOLDER}
                  maxItems={background.languageProficiencies.amount}
                />
              </Grid>
              <Grid item lg={6} xs={12} sx={{ py: 2 }}>
                <MultiComplete
                  values={tools || []}
                  results={tools?.filter((t) => backgroundForm.toolsId.includes(t.id)) || []}
                  data_cy="tools"
                  onChange={handleToolsChange}
                  label={BACKGROUND.TOOLS}
                  helpText={`You can have up to ${background.toolProficiencies.amount} tools`}
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
