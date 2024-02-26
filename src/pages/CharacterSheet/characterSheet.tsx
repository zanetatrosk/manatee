import { Button, Card, CardMedia, Grid, Paper } from "@mui/material";
import HeaderCard from "./components/headerCard";
import AbilityCard from "./components/abilityCard";
import SkillTable from "./components/skillTable";
import StatsGrid from "./components/statsGrid";
import TabsCard from "./components/tabsCard";
import React, { useEffect } from "react";
import { useGetCharacterByIdQuery } from "api/charactersApiSlice";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "@hooks/hooksStore";
import { setCharacterSheet } from "reducers/characterReducer";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



export default function CharacterSheet() {

  let { id } = useParams();
  const {data : character, isLoading } = useGetCharacterByIdQuery(id!);
  const dispatch = useAppDispatch();
  const [reduxLoading, setReduxLoading] = React.useState(true);
  useEffect(() => {
    if(character){
      dispatch(setCharacterSheet({...character}));
      setReduxLoading(false);
    } 
  }, [character]);
  
  if( !character || isLoading || reduxLoading ) return (<div>loading...</div>)

  const stats = [ {header: "speed", value: character.stats.speed.toString()}, 
                  {header: "prof. bonus", value: character.stats.proficiencyBonus.toString()},
                  {header: "armor class", value: character.stats.armorClass.toString()},
                  {header: "hit points", value: character.stats.hitPoints.toString()},
                  {header: "hit dice", value: character.stats.hitDice.notation },
                  {header: "initiative", value: character.stats.initiative.toString()},
                ]
  return (
    <React.Fragment>
        <Grid container mb={1}>
          <Grid item xs={10}>
            <Button variant="outlined" startIcon={<ArrowBackIcon/>}> Back to Create</Button>
          </Grid>
          <Grid item xs={2} container justifyContent={"flex-end"}>
            <Button variant="contained">Level up</Button>
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
            <Grid item>
              <SkillTable
                name="Skills"
                tableData={character.skills.map((i) => ({
                  label: i.displayName,
                  score: i.modifier,
                  checked: i.proficient
                }))
                }
              />
            </Grid>
            <Grid container item flexDirection={"column"} spacing={3} xs>
              <Grid container item spacing={3}>
                <Grid item sm={4.5} xs={12}>
                  <SkillTable
                    name="Saving Throws"
                    tableData={character.savingThrows.map((i) => ({
                      label: i.label,
                      score: i.modifier,
                      checked: i.proficient,
                    }))}
                  />
                </Grid>
                <Grid item container xs justifyContent="center">
                  <StatsGrid title="Stats" items={stats}/>
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

