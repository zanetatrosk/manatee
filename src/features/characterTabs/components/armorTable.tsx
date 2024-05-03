import CrudTable, { RowData } from "@components/crudTable";
import { Armor } from "@definitions/characterSheet";
import ButtonAddItems from "@features/buttonAddItems/buttonAddItems";
import { useAppSelector } from "@hooks/hooksStore";
import { usePostArmorByCharacterIdMutation } from "api/charactersApiSlice";
import { useGetArmorQuery } from "api/generalContentApiSlice";
import { CHARACTER_SHEET } from "constants/characterDefinition";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useArmor from "../hooks/useArmor";
import usePostArmor from "../hooks/usePostArmor";

export default function ArmorTable() {
  const {
    armor: armorStore,
    armorEquipped,
  } = useAppSelector((state) => state.character);
  const { id } = useParams();
  const ARMOR = CHARACTER_SHEET.ARMOR;
  const armorHeaders = [
    ARMOR.HEADERS.NAME,
    ARMOR.HEADERS.BASE_ARMOR_CLASS,
    ARMOR.HEADERS.TYPE,
  ];
  const postArmor = usePostArmor();
  const tranformArmor = (armor: Armor): RowData => {
    return {
      columns: [armor.name, armor.baseArmorClass.toString(), armor.type],
      description: armor.description,
    };
  };

  return (
    <CrudTable
      title={ARMOR.TITLE}
      rows={armorEquipped ? [tranformArmor(armorStore)] : []}
      headers={armorHeaders}
      showDescription
      actionButton={
        <ButtonAddItems
          buttonText={ARMOR.ADD_ARMOR}
          usePaginationHook={useArmor}
          defaults={armorEquipped ? [armorStore.id] : []}
          sendToBEHook={(armor: string[]) => postArmor(armor, id!)}
          singleChoice
          headers={armorHeaders}
        />
      }
    />
  );
}
