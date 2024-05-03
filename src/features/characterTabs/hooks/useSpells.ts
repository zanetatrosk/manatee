import { RowData } from "@components/crudTable";
import { useAppSelector } from "@hooks/hooksStore";
import { useGetSpellsQuery } from "api/generalContentApiSlice";

interface ItemsProps {
    data: RowData[];
    totalElements: number;
}

const useSpells = (
    page: number,
    size: number,
    query: string,
  ): ItemsProps => {
    const { sources } = useAppSelector(
      (state) => state.character,
    );
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

  export default useSpells;