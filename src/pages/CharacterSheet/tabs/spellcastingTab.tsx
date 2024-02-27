import { Button, Grid } from "@mui/material";
import AttacksTable, { RowData } from "../components/attacksTable";
import StatsGrid from "../components/statsGrid";
import { useAppSelector } from "@hooks/hooksStore";
import { Slot, Spell } from "@pages/CreateCharacter/definitions/characterForm";
import ButtonAddItems from "../tabsComponents/modalAddItems/buttonAddItems";
import { useSpells } from "../tabsComponents/modalAddItems/filteredTable";
import { usePostSpellsByCharacterIdMutation } from "api/charactersApiSlice";
import { useParams } from "react-router-dom";
import { useState } from "react";


export default function SpellcastingTab() {
  const {id} = useParams();
  const [postSpellsByCharacterId] = usePostSpellsByCharacterIdMutation();
  const { spellcasting } = useAppSelector((state) => state.character);

  const tranformSpells = (spells: Spell[]) => {
    return spells.map((spell: Spell) => {
      return {
        columns: [spell.name, spell.level.toString(), spell.range],
        id: spell.id,
        description: spell.description
      };
    });
  };

  const [tableSpells, setSpells] = useState<RowData[]>(tranformSpells(spellcasting?.spells || []));
  const usePostSpells = (spells: string[]) => {
    if(id){
      postSpellsByCharacterId({id, spells}).unwrap().then((s: Spell[]) => {
        setSpells(tranformSpells(s));
      });
    } 
  };
  
  debugger;
  if (!spellcasting) return null;
  return (  
    <>
      <Grid container spacing={2} flexDirection={"column"}>
        <Grid container item spacing={2}>
          <Grid item sm={7} xs={12} container>
            <StatsGrid
              title="Magic"
              items={[
                { header: "ability", value: spellcasting.ability.slice(0, 4)},
                {
                  header: "modifiers",
                  value: spellcasting.modifier.toString(),
                },
                { header: "save Dc", value: spellcasting.saveDc.toString()},
              ]}
            />
          </Grid>
          <Grid item container sm xs={12}>
            <AttacksTable
              title="Spell Slots"
              rows={spellcasting.slots.map((slot: Slot) => {
                return {
                  columns: [slot.level.toString(), slot.count.toString()],
                };
              })}
              headers={["level", "count"]}
              showDescription={false}
            />
          </Grid>
        </Grid>
        <Grid item>
          <AttacksTable
            title="Spells"
            rows={tableSpells}
            headers={["Name", "Level", "Range"]}
            actionButton={<ButtonAddItems singleChoice usePaginationHook={useSpells} defaults={spellcasting.spells.map( (spell: Spell) => spell.id )} sendToBEHook={usePostSpells}/>}
            showDescription
          />
        </Grid>
      </Grid>
    </>
  );
}
