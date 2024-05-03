import { useAppSelector } from "@hooks/hooksStore";
import { useGetArmorQuery } from "api/generalContentApiSlice";

const useArmor = (page: number, size: number, query: string) => {
    const { sources } = useAppSelector(
        (state) => state.character,
    );
    const armor = useGetArmorQuery({
      page: page,
      size: size,
      query: query,
      source: sources.map((s) => s.id),
    }).data;

    if (armor) {
      return {
        data: armor.content.map((armor) => {
          return {
            id: armor.id,
            columns: [armor.name, armor.baseArmorClass.toString(), armor.type],
            description: armor.description,
          };
        }),
        totalElements: armor.totalElements,
      };
    }
    return { data: [], totalElements: 0 };
};

export default useArmor;
