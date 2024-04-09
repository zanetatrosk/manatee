import { useAppDispatch, useAppSelector } from "@hooks/hooksStore";
import {
  Autocomplete,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { CREATE_CHARACTER } from "constants/characterDefinition";
import { useGetSourcesQuery } from "api/generalContentApiSlice";
import { BasicInfo } from "definitions/characterForm";
import { StepperForm } from "definitions/stepperForm";


const BASIC_INFO = CREATE_CHARACTER.BASIC_INFO;

function BasicInformation({
  form,
  setForm,
}: {
  form: BasicInfo;
  setForm: React.Dispatch<React.SetStateAction<StepperForm>>;
}) {
  //fetch data sources only first time when component is mounted
  const { data: sources, isLoading: loading } = useGetSourcesQuery();

  const setPropertyInForm = (property: string, value: any) => {
    
    setForm((prev) => ({
      ...prev,
      info: { ...prev.info, [property]: value },
    }));
  };

  console.log("rendering basic info");

  return (
    <Grid container spacing={10}>
      <Grid container item columnSpacing={8}>
        <Grid item xs={12} pb={4}>
          <Typography gutterBottom variant="h4" component="div">
            Basic Information
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            data-cy="character-name"
            value={form.characterName}
            onChange={(e) => {
              setPropertyInForm("characterName", e.target.value);
            }}
            inputProps={{ id: "input" }}
            variant="filled"
            label={BASIC_INFO.CHARACTER_NAME}
          ></TextField>
        </Grid>
        <Grid item xs={12} lg={5}>
          <TextField
            variant="filled"
            data-cy="player-name"
            fullWidth
            label={BASIC_INFO.PLAYER_NAME}
            value={form.playerName}
            onChange={(e) => {
              setPropertyInForm("playerName", e.target.value);
            }}
            inputProps={{ id: "input" }}
          ></TextField>
        </Grid>
      </Grid>
      <Grid container item>
        <Grid item xs={12} pb={1}>
          <Typography gutterBottom variant="h5" component="div">
            {BASIC_INFO.SOURCES}
          </Typography>
        </Grid>

        <Grid item xs>
          <Autocomplete
            id="combo-box-demo"
            value={sources?.filter((s) => form.sourceIds?.includes(s.id)) || []}
            options={sources || []}
            multiple
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(e, value) => {
              setPropertyInForm("sourceIds", value.map((v) => v.id));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={BASIC_INFO.SOURCES}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={23} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
                variant="filled"
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid container item direction={"row"} columnSpacing={8}>
        <Grid item xs={12} pb={1}>
          <Typography gutterBottom variant="h5" component="div">
            Images
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            value={form.cardPhotoUrl}
            onChange={(e) => {
              setPropertyInForm("cardPhotoUrl", e.target.value);
            }}
            variant="filled"
            label={BASIC_INFO.CARD_PHOTO}
          ></TextField>
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            data-cy="sheet-photo"
            variant="filled"
            fullWidth
            onChange={(e) => setPropertyInForm("sheetPhotoUrl", e.target.value)}
            label={BASIC_INFO.SHEET_PHOTO}
            value={form.sheetPhotoUrl}
          ></TextField>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default BasicInformation;
