import { Button, Card, CardMedia, Grid, Paper } from "@mui/material";
import HeaderCard from "../features/headerCard/headerCard";
import AbilityCard from "../components/abilityCard";
import SkillTable from "../components/skillTable";
import StatsGrid from "../features/statsGrid/statsGrid";
import TabsCard from "../features/characterTabs/tabsCard";
import React, { useEffect } from "react";
import { useGetCharacterByIdQuery, usePostLevelUpByCharacterIdMutation } from "api/charactersApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "@hooks/hooksStore";
import { setCharacterSheet } from "reducers/characterReducer";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Skills from "../features/skills/skills";
import { addPlusOrMinus } from "utils/textUtils";
import ConfirmationDialog from "@components/confirmationDialog";
import LoadingButton from '@mui/lab/LoadingButton';
import Spinner from "@components/spinner";



export default function CharacterSheet() {
  let { id } = useParams();
  const { data: character, isLoading } = useGetCharacterByIdQuery(id!);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [postLevelUp, { isLoading: loadingLevel }] = usePostLevelUpByCharacterIdMutation();
  const [open, setOpen] = React.useState(false);
  const [reduxLoading, setReduxLoading] = React.useState(true);

  const closeDialog = () => {
    setOpen(false);
  }

  useEffect(() => {
    if (character) {
      dispatch(setCharacterSheet({ ...character }));
      setReduxLoading(false);
    }
  }, [character]);

  if (!character || isLoading || reduxLoading) return <Spinner/>

  const confirmAction = () => {
    postLevelUp({ id: character.id });
    closeDialog();
  }

  const stats = [{ header: "armor class", value: character.stats.armorClass.toString() },
  { header: "initiative", value: addPlusOrMinus(character.stats.initiative) },
  { header: "speed", value: character.stats.speed.toString() + " ft" },
  { header: "prof. bonus", value: addPlusOrMinus(character.stats.proficiencyBonus) },
  { header: "hit point max", value: character.stats.hitPoints.toString() },
  { header: "hit dice", value: character.stats.hitDice.notation },
  ]
  return (
    <React.Fragment>
      <Grid container mb={1}>
        <Grid item container>
          <Grid item>
            <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate('/characters')}>Back</Button>
          </Grid>
          <Grid item xs container justifyContent={"flex-end"} spacing={2}>
            <Grid item>
              <Button variant="outlined" onClick={() => navigate('/characters/create-character/' + character.id)}>
                Remake character
              </Button>
            </Grid>
            <Grid item>
              {character.info.level < 20 && 
              <LoadingButton
                variant="contained"
                onClick={() => setOpen(true)}
                loading={loadingLevel}
              >
                Level up
                <ConfirmationDialog
                  title="Level up"
                  description={`Are you sure you want to level up character ${character.info.characterName} to level ${character.info.level + 1}?`}
                  openDialog={open}
                  confirmAction={confirmAction}
                  closeDialog={closeDialog} />
              </LoadingButton>}
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
                        header: "Player",
                        value: character.info.playerName,
                      },
                      {
                        header: "Race",
                        value: character?.info.race.name,
                      },
                      {
                        header: "Class & level",
                        value: character.info.class.name + " " + character.info.level,
                      },
                      {
                        header: "Subclass",
                        value: character.info.subclass,
                      },
                      {
                        header: "Background",
                        value: character.info.background.name,
                      },
                    ],
                  }}
                />
              </Grid>
              <Grid item container spacing={3} justifyContent="center">
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
          <Grid container item spacing={3} columns={{ xs: 12 }}>
            <Skills skills={character.skills} />
            <Grid container item flexDirection={"column"} spacing={3} xs>
              <Grid container item spacing={3}>
                <Grid item sm={4.5} xs={12}>
                  <SkillTable
                    name="Saving Throws"
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
                  <StatsGrid title="Stats" items={stats} />
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

