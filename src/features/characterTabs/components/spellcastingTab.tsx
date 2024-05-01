import CrudTable, { RowData } from "@components/crudTable";
import StatsGrid from "@features/statsGrid/statsGrid";
import { useAppSelector } from "@hooks/hooksStore";
import { Grid } from "@mui/material";
import { Spell, Slot } from "definitions/characterSheet";
import { usePostSpellsByCharacterIdMutation } from "api/charactersApiSlice";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { addPlusOrMinus } from "utils/textUtils";
import ButtonAddItems from "@features/buttonAddItems/buttonAddItems";
import { CHARACTER_SHEET } from "constants/characterDefinition";
import { Source } from "@definitions/characterForm";
import { useGetSpellsQuery } from "api/generalContentApiSlice";

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
  const [postSpellsByCharacterId] = usePostSpellsByCharacterIdMutation();
  const { spellcasting, sources } = useAppSelector((state) => state.character);

  const tranformSpells = (spells: Spell[]) => {
    return spells.map((spell: Spell) => {
      return {
        columns: [spell.name, spell.level.toString(), spell.castingTime],
        id: spell.id,
        description: spell.description,
      };
    });
  };

  const [tableSpells, setSpells] = useState<RowData[]>(
    tranformSpells(spellcasting?.spells || []),
  );
  const usePostSpells = (spells: string[]) => {
    if (id) {
      postSpellsByCharacterId({ id, spells })
        .unwrap()
        .then((s: Spell[]) => {
          setSpells(tranformSpells(s));
        });
    }
  };

  interface ItemsProps {
    data: RowData[];
    totalElements: number;
  }

  const useSpells = (
    page: number,
    size: number,
    query: string,
    source: Source[]
  ): ItemsProps => {
    const spellsInfo = useGetSpellsQuery({
      page: page,
      size: size,
      query: query,
      source: sources.map((s) => s.id),
    }).data;
    
    if (spellsInfo) {
      return {
        data: spellsInfo.content.map((spell) => {
          return {
            id: spell.id,
            columns: [spell.name, spell.level.toString(), spell.castingTime],
            description: spell.description,
          };
        }),
        totalElements: spellsInfo.totalElements,
      };
    }
    return {
      data: [],
      totalElements: 0,
    };
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
            rows={tableSpells}
            headers={spellsHeaders}
            actionButton={
              <ButtonAddItems
                buttonText={SPELLCASTING.ADD_SPELL}
                usePaginationHook={useSpells}
                defaults={spellcasting.spells?.map((spell: Spell) => spell.id)}
                sendToBEHook={usePostSpells}
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
