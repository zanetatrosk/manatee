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
import CardInfo from "../../components/cardInfo";
import React from "react";
import MultiComplete from "@components/customMultiComplete";
import { BaseItem, Class } from "../../definitions/characterForm";
import { useGetClassesQuery, useGetToolsQuery } from "api/generalContentApiSlice";
import { ClassForm, StepperForm } from "../../definitions/stepperForm";

const CLASS = CREATE_CHARACTER.CLASS;

export default function ClassFrame({
  classForm,
  setForm,
  sourceIds,
}: {
  classForm: ClassForm;
  setForm: React.Dispatch<React.SetStateAction<StepperForm>>;
  sourceIds: string[];
}) {
  const { data: classes, isLoading: loadingClasses } = useGetClassesQuery(sourceIds);
  const { data: tools, isLoading: toolsLoading } = useGetToolsQuery(sourceIds);
  const [characterClass, setClass] = React.useState<Class|null>(null);
  const [isVisible, setVisibility] = React.useState<boolean>(!!characterClass?.id);

  if(classForm.id && !characterClass){
      const classTmp = classes?.find((c) => c.id === classForm.id);
      if( classTmp ) {
        setClass(classTmp);
        setVisibility(true);
      }
  }

  console.log("render class");

  const setPropertyInForm = (property: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      class: { ...prev.class, [property]: value },
    }));
  };
  
  const handleToolsChange = (value: BaseItem[]): void => {
    setPropertyInForm(
      "toolIds",
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
            onChange={(e, value) => {
              if (!value) return;
              setClass(value);
              setPropertyInForm("id", value.id);
              setPropertyInForm("subclass", null);
              setPropertyInForm("toolIds", value.toolProficiencies.defaults.map((t) => t.id));
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
                  results={tools?.filter((t) => classForm.toolIds.includes(t.id)) || []}
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
