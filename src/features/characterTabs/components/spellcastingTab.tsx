import CrudTable from "@components/crudTable";
import StatsGrid from "@features/statsGrid/statsGrid";
import { useAppSelector } from "@hooks/hooksStore";
import { Grid } from "@mui/material";
import { Spell, Slot } from "definitions/characterSheet";
import { useParams } from "react-router-dom";
import { addPlusOrMinus } from "utils/textUtils";
import ButtonAddItems from "@features/buttonAddItems/buttonAddItems";
import { CHARACTER_SHEET } from "constants/characterDefinition";
import usePostSpells from "../hooks/usePostSpells";
import useSpells from "../hooks/useSpells";

export default function SpellcastingTab() {
  const SPELLCASTING = CHARACTER_SHEET.SPELLCASTING;
  const slotsHeaders = [
    SPELLCASTING.SLOTS_TABLE_HEADERS.LEVEL,
    SPELLCASTING.SLOTS_TABLE_HEADERS.SLOTS_TOTAL,
  ];
  const spellsHeaders = [
    SPELLCASTING.VIEW_TABLE_HEADERS.NAME,
    SPELLCASTING.VIEW_TABLE_HEADERS.LEVEL,
    SPELLCASTING.VIEW_TABLE_HEADERS.CASTING_TIME,
  ];
  const { id } = useParams();
  const { spellcasting } = useAppSelector((state) => state.character);
  const postSpells = usePostSpells();

  const tranformSpells = (spells: Spell[]) => {
    return spells.map((spell: Spell) => {
      return {
        columns: [spell.name, spell.level.toString(), spell.castingTime],
        id: spell.id,
        description: spell.description,
      };
    });
  };

  if (!spellcasting) return null;
  return (
    <>
      <Grid container spacing={2} flexDirection={"column"}>
        <Grid container item spacing={2}>
          <Grid item sm={7} xs={12} container>
            <StatsGrid
              title={SPELLCASTING.STATS_TITLE}
              items={[
                {
                  header: SPELLCASTING.ABILITY,
                  value: spellcasting.abilityAbbreviation,
                },
                {
                  header: SPELLCASTING.ATTACK_MODIFIER,
                  value: addPlusOrMinus(spellcasting.modifier),
                },
                {
                  header: SPELLCASTING.SAVE_DC,
                  value: spellcasting.saveDc.toString(),
                },
              ]}
            />
          </Grid>
          <Grid item sm xs={12} container>
            <CrudTable
              title={SPELLCASTING.SLOTS_TITLE}
              scrollable
              rows={spellcasting.slots.map((slot: Slot) => {
                return {
                  columns: [slot.level.toString(), slot.count.toString()],
                };
              })}
              headers={slotsHeaders}
              showDescription={false}
            />
          </Grid>
        </Grid>
        <Grid item>
          <CrudTable
            title={SPELLCASTING.SPELLS_TITLE}
            rows={tranformSpells(spellcasting.spells)}
            headers={spellsHeaders}
            actionButton={
              <ButtonAddItems
                buttonText={SPELLCASTING.ADD_SPELL}
                usePaginationHook={useSpells}
                defaults={spellcasting.spells?.map((spell: Spell) => spell.id)}
                sendToBEHook={(spells: string[]) => postSpells(spells, id!)}
                headers={spellsHeaders}
              />
            }
            showDescription
          />
        </Grid>
      </Grid>
    </>
  );
}
