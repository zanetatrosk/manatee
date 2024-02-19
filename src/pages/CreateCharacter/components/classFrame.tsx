import {
  Autocomplete,
  Box,
  CircularProgress,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { CREATE_CHARACTER } from "constants/characterDefinition";
import CardInfo from "./cardInfo";
import { useAppSelector, useAppDispatch } from "@hooks/hooksStore";
import React, { useEffect } from "react";
import MultiComplete from "@components/customMultiComplete";
import { AutocompleteItem, Class, Source } from "../definitions/characterForm";
import { useGetClassesQuery, useGetToolsQuery } from "api/raceApiSlice";
import { ClassForm, StepperForm } from "../definitions/stepperForm";

const CLASS = CREATE_CHARACTER.CLASS;

export default function ClassFrame({
  classForm,
  setForm,
}: {
  classForm: ClassForm;
  setForm: React.Dispatch<React.SetStateAction<StepperForm>>;
}) {
  const { data: classes, isLoading: loadingClasses } = useGetClassesQuery(
    useAppSelector((state) => state.character.basicInfo.sources).map(
      (s: Source) => s.id
    )
  );
  const { data: tools, isLoading: toolsLoading } = useGetToolsQuery(
    useAppSelector((state) => state.character.basicInfo.sources).map(
      (s: Source) => s.id
    )
  );

  const [characterClass, setClass] = React.useState<Class>(classes?.find((c) => c.id === classForm.id) || {} as Class);
  const [isVisible, setVisibility] = React.useState<boolean>(!!classForm.id);

  
  const setPropertyInForm = (property: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      class: { ...prev.class, [property]: value },
    }));
  };

  const handleToolsChange = (value: AutocompleteItem[]): void => {
    setPropertyInForm(
      "toolsId",
      value.map((v) => v.id)
    );
  };

  return (
    <Box>
      <Grid container direction="column" pb={2}>
        <Grid item>
          <Typography gutterBottom variant="h4" component="div">
            {CLASS.HEADING}
          </Typography>
        </Grid>
        <Grid item>
          {!isVisible && (
            <Typography gutterBottom variant="body2" color="text.secondary">
              {CLASS.SUBTITLE}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item lg={7} xs={12}>
          <Autocomplete
            id="combo-box-demo"
            options={classes || []}
            getOptionLabel={(option) => option.name}
            value={characterClass?.id ? characterClass : null}
            sx={{ my: 2 }}
            onChange={(_, value) => {
              if (!value) return;
              setClass(value);
              setPropertyInForm("id", value.id);
              setPropertyInForm("subclass", null);
              setPropertyInForm("toolsId", value.toolProficiencies.defaults.map((t) => t.id));
              setVisibility(true);
            }}
            data-cy="class"
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                label={CLASS.HEADING}
                variant="filled"
                placeholder={CLASS.PLACEHOLDER}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loadingClasses ? (
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
                <Autocomplete
                  options={characterClass?.subclasses || []}
                  value={classForm.subclass}
                  onChange={(_, value) => {
                    setPropertyInForm("subclass", value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={CLASS.SUBCLASS}
                      variant="filled"
                    />
                  )}
                />
              </Grid>
              <Grid item lg={6} xs={12} sx={{ py: 2 }}>
                <MultiComplete
                  values={tools || []}
                  results={tools?.filter((t) => classForm.toolsId.includes(t.id)) || []}
                  onChange={handleToolsChange}
                  label={CLASS.TOOLS}
                  helpText={`You can have up to ${characterClass?.toolProficiencies.amount} tools`}
                  placeholder={CLASS.TOOLS_PLACEHOLDER}
                  maxItems={characterClass?.toolProficiencies.amount || 0}
                />
              </Grid>
            </Grid>
            <Box>
              <CardInfo
                title={characterClass?.name || ""}
                features={characterClass?.features}
                description={characterClass?.description || ""}
              />
            </Box>
          </div>
        )}
      </React.Fragment>
    </Box>
  );
}
