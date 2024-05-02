import CrudTable, { RowData } from "@components/crudTable";
import { Armor } from "@definitions/characterSheet";
import ButtonAddItems from "@features/buttonAddItems/buttonAddItems";
import { useAppSelector } from "@hooks/hooksStore";
import { usePostArmorByCharacterIdMutation } from "api/charactersApiSlice";
import { useGetArmorQuery } from "api/generalContentApiSlice";
import { CHARACTER_SHEET } from "constants/characterDefinition";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ArmorTable() {
  const {
    armor: armorStore,
    armorEquipped,
    sources,
  } = useAppSelector((state) => state.character);
  const { id } = useParams();
  const [postArmorByCharacterId] = usePostArmorByCharacterIdMutation();
  const ARMOR = CHARACTER_SHEET.ARMOR;
  const armorHeaders = [
    ARMOR.HEADERS.NAME,
    ARMOR.HEADERS.BASE_ARMOR_CLASS,
    ARMOR.HEADERS.TYPE,
  ];

  const useArmor = (page: number, size: number, query: string) => {
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

  const usePostArmor = (armor: string[]) => {
    if (id) {
      postArmorByCharacterId({ id, armor: armor[0] });
    }
  };

  const tranformArmor = (armor: Armor): RowData => {
    return {
      columns: [armor.name, armor.baseArmorClass.toString(), armor.type],
      description: armor.description,
    };
  };

  useEffect(() => {
    if (armorStore && armorEquipped) {
      setArmor(tranformArmor(armorStore));
    }
  }, [armorStore]);

  const [armor, setArmor] = useState<RowData | null>(null);
  return (
    <CrudTable
      title={ARMOR.TITLE}
      rows={armor ? [armor] : []}
      headers={armorHeaders}
      showDescription
      actionButton={
        <ButtonAddItems
          buttonText={ARMOR.ADD_ARMOR}
          usePaginationHook={useArmor}
          defaults={armorEquipped ? [armorStore.id] : []}
          sendToBEHook={usePostArmor}
          singleChoice
          headers={armorHeaders}
        />
      }
    />
  );
}
