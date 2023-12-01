import { useAppDispatch, useAppSelector } from "@hooks/hooksStore";
import {
  Autocomplete,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import {
  AutocompleteItem,
  BasicInfo,
} from "@pages/CreateCharacter/definitions/characterForm";
import React, { useEffect } from "react";
import { setBasicInfo } from "reducers/characterReducer";
import { CREATE_CHARACTER } from "constants/characterDefinition";
import { useGetSourcesQuery } from "api/raceApiSlice";

const BASIC_INFO = CREATE_CHARACTER.BASIC_INFO;

export default function BasicInformation() {
  const { basicInfo: basicInfoFromStore } = useAppSelector(
    (state) => state.character
  );
  const dispatch = useAppDispatch();
  const [basicInfo, setInfo] = React.useState<BasicInfo>(basicInfoFromStore);
  //this is uneffective, bcs it is called every time user inputs something
  useEffect(() => {
    const basicInfoTmp = {
      ...basicInfo,
      sources: basicInfo.sources.map((s) => s),
    };
    console.log(basicInfoTmp, "basicInfoTmp");
    dispatch(setBasicInfo(basicInfoTmp));
  }, [basicInfo, dispatch]);

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
            value={basicInfo.characterName}
            onChange={(e) =>
              setInfo({ ...basicInfo, characterName: e.target.value })
            }
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
            value={basicInfo.playerName}
            onChange={(e) =>
              setInfo({ ...basicInfo, playerName: e.target.value })
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
            value={basicInfo.sources}
            options={sources || []}
            multiple
            getOptionLabel={(option) => option.title}
            onChange={(_, value) => {
              if (!value) return;
              setInfo({ ...basicInfo, sources: value });
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
            value={basicInfo.cardPhoto}
            onChange={(e) =>
              setInfo({ ...basicInfo, cardPhoto: e.target.value })
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
              setInfo({ ...basicInfo, sheetPhoto: e.target.value })
            }
            label={BASIC_INFO.SHEET_PHOTO}
            value={basicInfo.sheetPhoto}
          ></TextField>
        </Grid>
      </Grid>
    </Grid>
  );
}

//generate sources for dnd5e
const sourcesTh: AutocompleteItem[] = [
  { id: 0, title: "Player's Handbook" },
  { id: 1, title: "Dungeon Master's Guide" },
  { id: 2, title: "Monster Manual" },
  { id: 3, title: "Volo's Guide to Monsters" },
  { id: 4, title: "Mordenkainen's Tome of Foes" },
  { id: 5, title: "Xanathar's Guide to Everything" },
  { id: 6, title: "Guildmasters' Guide to Ravnica" },
  { id: 7, title: "Acquisitions Incorporated" },
  { id: 8, title: "Eberron: Rising from the Last War" },
  { id: 9, title: "Explorer's Guide to Wildemount" },
  { id: 10, title: "Mythic Odysseys of Theros" },
  { id: 11, title: "Tasha's Cauldron of Everything" },
  { id: 12, title: "Van Richten's Guide to Ravenloft" },
  { id: 13, title: "Fizban's Treasury of Dragons" },
  { id: 14, title: "Strixhaven: A Curriculum of Chaos" },
  { id: 15, title: "The Wild Beyond the Witchlight" },
];
