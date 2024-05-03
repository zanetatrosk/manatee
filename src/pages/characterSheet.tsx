import AbilityCard from "@components/abilityCard";
import SkillTable from "@components/skillTable";
import Spinner from "@components/spinner";
import CharacterHeader from "@features/characterHeader/characterHeader";
import TabsCard from "@features/characterTabs/tabsCard";
import HeaderCard from "@features/headerCard/headerCard";
import Skills from "@features/skills/skills";
import StatsGrid from "@features/statsGrid/statsGrid";
import { useAppDispatch } from "@hooks/hooksStore";
import { Paper, Grid, Card, CardMedia } from "@mui/material";
import { useGetCharacterByIdQuery } from "api/charactersApiSlice";
import { CHARACTER_SHEET } from "constants/characterDefinition";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { setCharacterSheet } from "reducers/characterReducer";
import { addPlusOrMinus } from "utils/textUtils";

export default function CharacterSheet() {
  let { id } = useParams();
  const { data: character, isLoading } = useGetCharacterByIdQuery(id!);
  const dispatch = useAppDispatch();
  const [reduxLoading, setReduxLoading] = React.useState(true);
  useEffect(() => {
    if (character) {
      dispatch(setCharacterSheet({ ...character }));
      setReduxLoading(false);
    }
  }, [character, dispatch]);

  if (!character || isLoading || reduxLoading) return <Spinner />;

  const headers =  [
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
  ];

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
      <CharacterHeader character={character}/>
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
                    // Picture by user:
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
                    headers: headers,
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
