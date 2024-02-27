import { useAppSelector } from "@hooks/hooksStore";
import AttacksTable, { RowData } from "../components/attacksTable";
import {
  Armor,
  Weapon,
} from "@pages/CreateCharacter/definitions/characterForm";
import { useEffect, useState } from "react";
import ButtonAddItems from "../tabsComponents/modalAddItems/buttonAddItems";
import { useGetArmorQuery, useGetWeaponsQuery } from "api/raceApiSlice";
import { useParams } from "react-router-dom";
import { usePostArmorByCharacterIdMutation, usePostWeaponsByCharacterIdMutation } from "api/charactersApiSlice";
import { transform } from "typescript";

const useAttacks = (page: number, size: number, query: string) => {
  
  const attacks = useGetWeaponsQuery({
    page: page,
    size: size,
    query: query,
  }).data;
  if (attacks) {
    return {
      data: attacks.content.map((weapon: Weapon) => {
        return {
          id: weapon.id,
          columns: [weapon.name, weapon.range.toString(), weapon.damageType],
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
}

export default function AttacksAndArmorTab() {
  const { armor: armorStore, weapons: weaponsStore } = useAppSelector(
    (state) => state.character
    );
    const {id} = useParams();
    const [postAttacksByCharacterId] = usePostWeaponsByCharacterIdMutation();
    const [postArmorByCharacterId] = usePostArmorByCharacterIdMutation();

    const usePostAttacks = (weapons: string[]) => {
      if(id){
        postAttacksByCharacterId({id, weapons}).unwrap().then((a: Weapon[]) => {
          setWeapons(transformAttacks(a));
        });
      }
    }

    const usePostArmor = (armor: string[]) => {
      if(id){
        postArmorByCharacterId({id, armor: armor[0]}).unwrap().then((a: Armor) => {
          setArmor(tranformArmor(a));
        });
      }
    }

    const tranformArmor = (armor: Armor): RowData => {
      return {
        columns: [armor.name, armor.baseArmorClass.toString(), armor.type],
        description: armor.description,
      };
    };

    const transformAttacks = (weapons: Weapon[]): RowData[] => {
    const wap = weapons.map((weapon: Weapon) => {
      return {
        id: weapon.id,
        columns: [weapon.name, weapon.range.toString(), weapon.damageType],
      };
    });
    return wap;
  };
  const [armor, setArmor] = useState<RowData>(tranformArmor(armorStore));
  const [weapons, setWeapons] = useState<RowData[]>(
    transformAttacks(weaponsStore)
  );
  
  return (
    <>
      <AttacksTable
        title="Attacks"
        rows={weapons}
        headers={["Name", "Attack range", "Damage type"]}
        actionButton={
          <ButtonAddItems
            usePaginationHook={useAttacks}
            defaults={weaponsStore.map((w) => w.id)}
            sendToBEHook={usePostAttacks}
          />
        }
      />
      <div style={{ margin: 30 }} />
      <AttacksTable
        title="Armor"
        rows={[armor]}
        headers={["Name", "Base armor class", "Damage type"]}
        showDescription
        actionButton={
          <ButtonAddItems
            usePaginationHook={useArmor}
            defaults={[armorStore.id]}
            sendToBEHook={usePostArmor}
            singleChoice
            
          />
        }
      />
    </>
  );
}


