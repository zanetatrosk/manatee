import { Weapon } from "@definitions/characterSheet";
import { useAppSelector } from "@hooks/hooksStore";
import { useGetWeaponsQuery } from "api/generalContentApiSlice";

const useAttacks = (page: number, size: number, query: string) => {
    const { sources } = useAppSelector(
        (state) => state.character,
    );
    const attacks = useGetWeaponsQuery({
      page: page,
      size: size,
      query: query,
      source: sources.map((s) => s.id),
    }).data;

    if (attacks) {
      return {
        data: attacks.content.map((weapon: Weapon) => {
          return {
            id: weapon.id,
            columns: [weapon.name, weapon.range, weapon.damageType],
            description: weapon.properties.join(", "),
          };
        }),
        totalElements: attacks.totalElements,
      };
    }
    return { data: [], totalElements: 0 };
  };

export default useAttacks;  