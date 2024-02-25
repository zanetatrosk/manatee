import { useAppSelector } from "@hooks/hooksStore";
import AttacksTable, { RowData } from "../components/attacksTable";

export default function AttacksAndArmorTab() {
  const { armor, weapons } = useAppSelector((state) => state.character);
  return (
    <>
      <AttacksTable
        title="Attacks"
        rows={weapons.map((weapon) => {
          return {
            columns: [
              weapon.name,
              weapon.range.toString(),
              weapon.damageType,
            ],
          };
        })}
        headers={["Name", "Attack range", "Damage type"]}
      />
      <div style={{ margin: 30 }} />
      <AttacksTable
        title="Armor"
        rows={[
          {
            columns: [armor.name, armor.baseArmorClass.toString(), armor.type],
            description: armor.description,
          },
        ]}
        headers={["Name", "Base armor class", "Damage type"]}
        showDescription
      />
    </>
  );
}
