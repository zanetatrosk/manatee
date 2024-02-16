import { useAppDispatch, useAppSelector } from "@hooks/hooksStore";
import {
  Autocomplete,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { CREATE_CHARACTER } from "constants/characterDefinition";
import { useGetSourcesQuery } from "api/raceApiSlice";
import { StepperForm } from "../definitions/stepperForm";


const BASIC_INFO = CREATE_CHARACTER.BASIC_INFO;

function BasicInformation({ form, setForm }: {form: StepperForm, setForm: React.Dispatch<React.SetStateAction<StepperForm>>}){
  
  
  //fetch data sources only first time when component is mounted
  const { data: sources, isLoading: loading } = useGetSourcesQuery();

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
            value={form.basicInfo.characterName}
            onChange={(e) => {
              setForm({ ...form, basicInfo: { ...form.basicInfo, characterName: e.target.value } })
            }}
           
            inputProps={{ "id": "input" }}
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
            value={form.basicInfo.playerName}
            onChange={(e) =>
              setForm({ ...form, basicInfo: { ...form.basicInfo, playerName: e.target.value } })
            }
            inputProps={{ "id": "input" }}
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
            value={form.basicInfo.sources}
            options={sources || []}
            multiple
            getOptionLabel={(option) => option.name}
            onChange={(_, value) => {
              if (!value) return;
              setForm({ ...form, basicInfo: { ...form.basicInfo, sources: value } });
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
            value={form.basicInfo.cardPhoto}
            onChange={(e) =>
              setForm({ ...form, basicInfo: { ...form.basicInfo, cardPhoto: e.target.value } })
            }
            variant="filled"
            label={BASIC_INFO.CARD_PHOTO}
          ></TextField>
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            data-cy="sheet-photo"
            variant="filled"
            fullWidth
            onChange={(e) =>
              setForm({ ...form, basicInfo: { ...form.basicInfo, sheetPhoto: e.target.value } })
            }
            label={BASIC_INFO.SHEET_PHOTO}
            value={form.basicInfo.sheetPhoto}
          ></TextField>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default BasicInformation;
