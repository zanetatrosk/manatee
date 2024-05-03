import { Button, Card, CardMedia, Grid, Paper } from "@mui/material";
import HeaderCard from "../features/headerCard/headerCard";
import AbilityCard from "../components/abilityCard";
import SkillTable from "../components/skillTable";
import StatsGrid from "../features/statsGrid/statsGrid";
import TabsCard from "../features/characterTabs/tabsCard";
import React, { useEffect } from "react";
import {
  useGetCharacterByIdQuery,
  useGetPdfByCharacterIdQuery,
  usePostLevelUpByCharacterIdMutation,
} from "api/charactersApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "@hooks/hooksStore";
import { setCharacterSheet } from "reducers/characterReducer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Skills from "../features/skills/skills";
import { addPlusOrMinus } from "utils/textUtils";
import ConfirmationDialog from "@components/confirmationDialog";
import LoadingButton from "@mui/lab/LoadingButton";
import Spinner from "@components/spinner";
import { CHARACTER_SHEET, COMMON } from "constants/characterDefinition";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

export default function CharacterSheet() {
  let { id } = useParams();
  const { data: character, isLoading } = useGetCharacterByIdQuery(id!);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [postLevelUp, { isLoading: loadingLevel }] =
    usePostLevelUpByCharacterIdMutation();
  const [open, setOpen] = React.useState(false);
  const [reduxLoading, setReduxLoading] = React.useState(true);

  const closeDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (character) {
      dispatch(setCharacterSheet({ ...character }));
      setReduxLoading(false);
    }
  }, [character]);

  if (!character || isLoading || reduxLoading) return <Spinner />;

  const confirmAction = () => {
    postLevelUp({ id: character.id });
    closeDialog();
  };

  const stats = [
    {
      header: CHARACTER_SHEET.STATS.ARMOR_CLASS,
      value: character.stats.armorClass.toString(),
    },
    {
      header: CHARACTER_SHEET.STATS.INITIATIVE,
      value: addPlusOrMinus(character.stats.initiative),
    },
    {
      header: CHARACTER_SHEET.STATS.SPEED,
      value: character.stats.speed.toString() + " ft",
    },
    {
      header: CHARACTER_SHEET.STATS.PROF_BONUS,
      value: addPlusOrMinus(character.stats.proficiencyBonus),
    },
    {
      header: CHARACTER_SHEET.STATS.HIT_POINT_MAX,
      value: character.stats.hitPoints.toString(),
    },
    {
      header: CHARACTER_SHEET.STATS.HIT_DICE,
      value: character.stats.hitDice.notation,
    },
  ];
  
  return (
    <React.Fragment>
      <Grid container mb={1}>
        <Grid item container spacing={2}>
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/characters")}
            >
              {CHARACTER_SHEET.ACTIONS.BACK}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<SaveAltIcon />}
              onClick={ async () => {
                  fetch(process.env.REACT_APP_API_URL + "characters/" + character.id + "/pdf", {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/pdf",
                    },
                  })
                    .then((response) => response.blob())
                    .then((blob) => {
                      const url = window.URL.createObjectURL(new Blob([blob]));
                      const link = document.createElement("a");
                      link.href = url;
                      link.setAttribute("download", character.info.characterName + ".pdf");
                      document.body.appendChild(link);
                      link.click();
                      link.parentNode?.removeChild(link);
                    });
              }}
            >
              {CHARACTER_SHEET.ACTIONS.GENERATE_PDF}
            </Button>
          </Grid>
          <Grid item xs container justifyContent={"flex-end"} spacing={2}>
            <Grid item>
              <Button
                variant="outlined"
                onClick={() =>
                  navigate("/characters/create-character/" + character.id)
                }
              >
                {CHARACTER_SHEET.ACTIONS.REMAKE_CHARACTER}
              </Button>
            </Grid>
            <Grid item>
              {character.info.level < 20 && (
                <LoadingButton
                  variant="contained"
                  onClick={() => setOpen(true)}
                  loading={loadingLevel}
                >
                  {CHARACTER_SHEET.ACTIONS.LEVEL_UP}
                  <ConfirmationDialog
                    title={CHARACTER_SHEET.ACTIONS.LEVEL_UP}
                    description={
                      CHARACTER_SHEET.LEVEL_UP_MODAL.FIRST_PART +
                      ` ${character.info.characterName} ` +
                      CHARACTER_SHEET.LEVEL_UP_MODAL.SECOND_PART +
                      ` ${character.info.level + 1}` +
                      COMMON.QUESTION_MARK
                    }
                    openDialog={open}
                    confirmAction={confirmAction}
                    closeDialog={closeDialog}
                  />
                </LoadingButton>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Paper sx={{ p: 2 }} elevation={4}>
        <Grid container flexDirection={"column"} spacing={5}>
          {/* first row */}
          <Grid item container spacing={2}>
            {character.info.sheetPhotoUrl && (
              <Grid item>
                <Card sx={{ maxWidth: 250, height: "100%", maxHeight: 345 }}>
                  <CardMedia
                    sx={{ height: "100%" }}
                    component="img"
                    // Picture by internet user:
                    src={character.info.sheetPhotoUrl}
                    title="character"
                  />
                </Card>
              </Grid>
            )}
            <Grid
              item
              container
              xs={!!character.info.sheetPhotoUrl}
              spacing={3}
              justifyContent="center"
            >
              <Grid item xs>
                <HeaderCard
                  props={{
                    title: character.info.characterName,
                    headers: [
                      {
                        header: CHARACTER_SHEET.HEADER.PLAYER,
                        value: character.info.playerName,
                      },
                      {
                        header: CHARACTER_SHEET.HEADER.RACE,
                        value: character?.info.race.name,
                      },
                      {
                        header: CHARACTER_SHEET.HEADER.CLASS_LEVEL,
                        value:
                          character.info.class.name +
                          " " +
                          character.info.level,
                      },
                      {
                        header: CHARACTER_SHEET.HEADER.SUBCLASS,
                        value: character.info.subclass,
                      },
                      {
                        header: CHARACTER_SHEET.HEADER.BACKGROUND,
                        value: character.info.background.name,
                      },
                    ],
                  }}
                />
              </Grid>
              <Grid item container justifyContent="center" spacing={3}>
                {character.abilities.map((i, idx) => (
                  <Grid item key={idx}>
                    <AbilityCard
                      ability={i.label}
                      score={i.result}
                      modifier={i.modifier}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          {/* second row */}
          <Grid container item spacing={3}>
            <Skills skills={character.skills} />
            <Grid container item flexDirection={"column"} spacing={3} xs>
              <Grid container item spacing={3}>
                <Grid item md={4.5} xs={12}>
                  <SkillTable
                    name={CHARACTER_SHEET.SAVING_THROWS}
                    disabled
                    tableData={character.savingThrows.map((i) => ({
                      id: i.label,
                      label: i.displayName,
                      modifier: i.modifier,
                      checked: i.proficient,
                    }))}
                  />
                </Grid>
                <Grid item container xs justifyContent="center">
                  <StatsGrid
                    title={CHARACTER_SHEET.STATS.TITLE}
                    items={stats}
                  />
                </Grid>
              </Grid>
              <Grid container item xs>
                <Grid item xs>
                  <TabsCard />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
}
