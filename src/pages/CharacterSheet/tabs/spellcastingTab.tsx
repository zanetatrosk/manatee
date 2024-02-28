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
  const { id } = useParams();
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
    if (id) {
      postSpellsByCharacterId({ id, spells }).unwrap().then((s: Spell[]) => {
        setSpells(tranformSpells(s));
      });
    }
  };

  if (!spellcasting) return null;
  return (
    <>
      <Grid container spacing={2} flexDirection={"column"}>
        <Grid container item spacing={2}>
          <Grid item sm={7} xs={12} container>
            <StatsGrid
              title="Spellcasting Stats"
              items={[
                { header: "ability", value: spellcasting.abilityAbbreviation },
                {
                  header: "attack mod.",
                  value: spellcasting.modifier.toString(),
                },
                { header: "save DC", value: spellcasting.saveDc.toString() },
              ]}
            />
          </Grid>
          <Grid item sm xs={12} container>
            <AttacksTable
              title="Spell Slots"
              scrollable
              rows={spellcasting.slots.map((slot: Slot) => {
                return {
                  columns: [slot.level.toString(), slot.count.toString()],
                };
              })}
              headers={["Level", "Slots total"]}
              showDescription={false}
            />
          </Grid>
        </Grid>
        <Grid item>
          <AttacksTable
            title="Spells"
            rows={tableSpells}
            headers={["Name", "Level", "Range"]}
            actionButton={
              <ButtonAddItems buttonText="Add Spells" usePaginationHook={useSpells} defaults={spellcasting.spells.map((spell: Spell) => spell.id)} sendToBEHook={usePostSpells} headers={["Name", "Level", "Range"]} />
            }
            showDescription
          />
        </Grid>
      </Grid>
    </>
  );
}
