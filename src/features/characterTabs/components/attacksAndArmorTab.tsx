import { useAppSelector } from "@hooks/hooksStore";
import CrudTable, { RowData } from "../../../components/crudTable";

import { useEffect, useState } from "react";
import ButtonAddItems from "../../buttonAddItems/buttonAddItems";
import {
  useGetArmorQuery,
  useGetWeaponsQuery,
} from "api/generalContentApiSlice";
import { useParams } from "react-router-dom";
import {
  usePostArmorByCharacterIdMutation,
  usePostWeaponsByCharacterIdMutation,
} from "api/charactersApiSlice";
import { addPlusOrMinus } from "utils/textUtils";
import { Armor, Attack, Weapon } from "definitions/characterSheet";
import { CHARACTER_SHEET } from "constants/characterDefinition";
import { Box } from "@mui/material";

const transformAttacks = (weapons: Attack[]): RowData[] => {
  const wap = weapons.map((weapon: Attack) => {
    return {
      id: weapon.name,
      columns: [weapon.name, addPlusOrMinus(weapon.attackBonus), weapon.damage],
    };
  });
  return wap;
};



const ATTACKS = CHARACTER_SHEET.ATTACKS;
const ARMOR = CHARACTER_SHEET.ARMOR;
export default function AttacksAndArmorTab() {
  const { armor: armorStore, attacks: weaponsStore, armorEquipped, sources } = useAppSelector(
    (state) => state.character,
  );
  const { id } = useParams();
  const [postAttacksByCharacterId] = usePostWeaponsByCharacterIdMutation();
  const [postArmorByCharacterId] = usePostArmorByCharacterIdMutation();
  const armorHeaders = [
    ARMOR.HEADERS.NAME,
    ARMOR.HEADERS.BASE_ARMOR_CLASS,
    ARMOR.HEADERS.TYPE,
  ];
  const attackHeaders = [
    ATTACKS.HEADERS.NAME,
    ATTACKS.HEADERS.ATTACK_BONUS,
    ATTACKS.HEADERS.DAMAGE_TYPE,
  ];

  const useAttacks = (page: number, size: number, query: string) => {
    const attacks = useGetWeaponsQuery({
      page: page,
      size: size,
      query: query,
      source: sources.map((s) => s.id)
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
  
  const useArmor = (page: number, size: number, query: string) => {
    const armor = useGetArmorQuery({
      page: page,
      size: size,
      query: query,
      source: sources.map((s) => s.id)
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

  const usePostAttacks = (weapons: string[]) => {
    if (id) {
      postAttacksByCharacterId({ id, weapons });
    }
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
    setWeapons(transformAttacks(weaponsStore));
  }, [weaponsStore]);

  useEffect(() => {
    if (armorStore && armorEquipped) {
      setArmor(tranformArmor(armorStore));
    }
  }, [armorStore]);

  const [armor, setArmor] = useState<RowData|null>(null);
  const [weapons, setWeapons] = useState<RowData[]>([]);

  return (
    <>
      <CrudTable
        title={ATTACKS.TITLE}
        rows={weapons}
        headers={attackHeaders}
        actionButton={
          <ButtonAddItems
            buttonText={ATTACKS.ADD_ATTACK}
            usePaginationHook={useAttacks}
            defaults={weaponsStore.map((w) => w.id)}
            sendToBEHook={usePostAttacks}
            headers={attackHeaders}
          />
        }
      />
      <Box sx={{ margin: 3 }} />
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
    </>
  );
}
