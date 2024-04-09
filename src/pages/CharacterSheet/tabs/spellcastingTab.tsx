import { Grid } from "@mui/material";
import AttacksTable, { RowData } from "../components/attacksTable";
import StatsGrid from "../components/statsGrid";
import { useAppSelector } from "@hooks/hooksStore";
import ButtonAddItems from "../tabsComponents/modalAddItems/buttonAddItems";
import { useSpells } from "../tabsComponents/modalAddItems/filteredTable";
import { usePostSpellsByCharacterIdMutation } from "api/charactersApiSlice";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { addPlusOrMinus } from "utils/textUtils";
import { Spell, Slot } from "@pages/CreateCharacter/definitions/characterSheet";


export default function SpellcastingTab() {
  const { id } = useParams();
  const [postSpellsByCharacterId] = usePostSpellsByCharacterIdMutation();
  const { spellcasting } = useAppSelector((state) => state.character);

  

  const tranformSpells = (spells: Spell[]) => {
    return spells.map((spell: Spell) => {
      return {
        columns: [spell.name, spell.level.toString(), spell.castingTime],
        id: spell.id,
        description: spell.description,
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
                  value: addPlusOrMinus(spellcasting.modifier),
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
            headers={["Name", "Level", "Casting time"]}
            actionButton={
              <ButtonAddItems buttonText="Add Spells" usePaginationHook={useSpells} defaults={spellcasting.spells.map((spell: Spell) => spell.id)} sendToBEHook={usePostSpells} headers={["Name", "Level", "Casting time"]} />
            }
            showDescription
          />
        </Grid>
      </Grid>
    </>
  );
}
