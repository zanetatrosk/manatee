import CrudTable, { RowData } from "@components/crudTable";
import { Attack } from "@definitions/characterSheet";
import ButtonAddItems from "@features/buttonAddItems/buttonAddItems";
import { useAppSelector } from "@hooks/hooksStore";
import { CHARACTER_SHEET } from "constants/characterDefinition";
import { useParams } from "react-router-dom";
import { addPlusOrMinus } from "utils/textUtils";
import usePostAttacks from "../hooks/usePostAttacks";
import useAttacks from "../hooks/useAttacks";

export default function AttacksTable() {
  const ATTACKS = CHARACTER_SHEET.ATTACKS;
  const attackHeaders = [
    ATTACKS.HEADERS.NAME,
    ATTACKS.HEADERS.ATTACK_BONUS,
    ATTACKS.HEADERS.DAMAGE_TYPE,
  ];
  const { attacks: weaponsStore } = useAppSelector(
    (state) => state.character,
  );
  const { id } = useParams();
  const postAttacks = usePostAttacks();
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

  return (
    <CrudTable
      title={ATTACKS.TITLE}
      rows={transformAttacks(weaponsStore)}
      headers={attackHeaders}
      actionButton={
        <ButtonAddItems
          buttonText={ATTACKS.ADD_ATTACK}
          usePaginationHook={useAttacks}
          defaults={weaponsStore.map((w) => w.id)}
          sendToBEHook={(weapons: string[]) => postAttacks(weapons, id!)}
          headers={attackHeaders}
        />
      }
    />
  );
}
