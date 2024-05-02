import CrudTable, { RowData } from "@components/crudTable";
import { Attack, Weapon } from "@definitions/characterSheet";
import ButtonAddItems from "@features/buttonAddItems/buttonAddItems";
import { useAppSelector } from "@hooks/hooksStore";
import { usePostWeaponsByCharacterIdMutation } from "api/charactersApiSlice";
import { useGetWeaponsQuery } from "api/generalContentApiSlice";
import { CHARACTER_SHEET } from "constants/characterDefinition";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addPlusOrMinus } from "utils/textUtils";

export default function AttacksTable() {
  const ATTACKS = CHARACTER_SHEET.ATTACKS;
  const { attacks: weaponsStore, sources } = useAppSelector(
    (state) => state.character,
  );
  const [weapons, setWeapons] = useState<RowData[]>([]);
  const { id } = useParams();
  const [postAttacksByCharacterId] = usePostWeaponsByCharacterIdMutation();
  const usePostAttacks = (weapons: string[]) => {
    if (id) {
      postAttacksByCharacterId({ id, weapons });
    }
  };
  const transformAttacks = (weapons: Attack[]): RowData[] => {
    const wap = weapons.map((weapon: Attack) => {
      return {
        id: weapon.name,
        columns: [
          weapon.name,
          addPlusOrMinus(weapon.attackBonus),
          weapon.damage,
        ],
      };
    });
    return wap;
  };

  useEffect(() => {
    setWeapons(transformAttacks(weaponsStore));
  }, [weaponsStore]);

  const useAttacks = (page: number, size: number, query: string) => {
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

  const attackHeaders = [
    ATTACKS.HEADERS.NAME,
    ATTACKS.HEADERS.ATTACK_BONUS,
    ATTACKS.HEADERS.DAMAGE_TYPE,
  ];

  return (
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
  );
}
