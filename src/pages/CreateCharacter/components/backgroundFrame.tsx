import * as React from "react";
import { Box, Autocomplete, Divider, Grid, CircularProgress } from "@mui/material";
import Typography from "@mui/material/Typography";
import MultiComplete from "@components/customMultiComplete";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import {
  Background,
  AutocompleteItem,
} from "@pages/CreateCharacter/definitions/characterForm";
import CardInfo from "./cardInfo";
import { useAppDispatch, useAppSelector } from "@hooks/hooksStore";
import { setBackground as setBackgroundStore } from "reducers/characterReducer";
import {CREATE_CHARACTER} from "constants/characterDefinition";
import { useGetBackgroundsQuery, useGetLanguagesQuery, useGetToolsQuery } from "api/raceApiSlice";

const BACKGROUND = CREATE_CHARACTER.BACKGROUND;

export default function BackgroundFrame() {
  const backgroundStore = useAppSelector((state) => state.character.background);
  const dispatch = useAppDispatch();

  const [isVisible, setVisibility] = React.useState(false);
  const [languagesValue, setLanguages] = useState<AutocompleteItem[]>([]);
  const [background, setBackground] = useState<Background>(backgroundStore);
  const [toolsValue, setTools] = useState<AutocompleteItem[]>([]);

  const {data: backgrounds, isLoading: loadingBackgrounds} = useGetBackgroundsQuery();
  const {data: languages, isLoading: loadingLanguages} = useGetLanguagesQuery();
  const {data: tools, isLoading: loadingTools} = useGetToolsQuery();

  const handleToolsChange = (value: AutocompleteItem[]): void => {
    setTools(value);
  }

  const handleLanguagesChange = (value: AutocompleteItem[]): void => {
    setLanguages(value);
  }

  useEffect(() => {
    if (!background.id) return;
    setLanguages(background.languages?.defaults);
    setTools(background.tools?.defaults);
    setVisibility(true);
    const tmpBack = background;
    dispatch(setBackgroundStore(tmpBack));
  }, [background, dispatch]);

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
            id="combo-box-demo"
            options={backgrounds || []}
            value={background.id? background : null}
            sx={{ my: 2 }}
            onChange={(_, value) => {
              if (!value) return;
              setBackground(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={BACKGROUND.HEADING}
                variant="filled"
                placeholder={BACKGROUND.PLACEHOLDER}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loadingBackgrounds ? <CircularProgress color="inherit" size={23} /> : null }
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
                  results={languagesValue}
                  onChange={handleLanguagesChange}
                  label={BACKGROUND.LANGUAGES}
                  helpText={`Please choose ${background.languages.amount} languages`}
                  placeholder={BACKGROUND.LANGUAGES_PLACEHOLDER}
                  maxItems={background.languages.amount}
                />
              </Grid>
              <Grid item lg={6} xs={12} sx={{ py: 2 }}>
                <MultiComplete
                  values={tools || []}
                  results={toolsValue}
                  onChange={handleToolsChange}
                  label={BACKGROUND.TOOLS}
                  helpText={`Please choose ${background.tools.amount} tools`}
                  placeholder={BACKGROUND.TOOLS_PLACEHOLDER}
                  maxItems={background.tools.amount}
                />
              </Grid>
            </Grid>
            <Box>
              <CardInfo
                title={background.label}
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
