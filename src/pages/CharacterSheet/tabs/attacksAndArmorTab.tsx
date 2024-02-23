import { useAppSelector } from "@hooks/hooksStore";
import AttacksTable, { RowData } from "../components/attacksTable";

const rows: RowData[] = [
    {
      columns: ["Longsword", "+5", "Slashing"],
      description: "lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    {
      columns: ["Dagger", "+3", "Piercing"],
      description: " lorem ipsum dolor sit amet consectetur adipisicing elitlorem ipsum dolor sit amet consecte",
    },
    {
      columns: ["Fireball", "+8", "Fire"],
      description: "lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
  ];
export default function AttacksAndArmorTab(){
  const { armor } = useAppSelector((state) => state.character);
    return (
        <>
        <AttacksTable
              title="Attacks"
              rows={rows}
              headers={["Name", "Attack bonus", "Damage type"]}
              showDescription
            />
            <div style={{ margin: 30 }} />
            <AttacksTable
              title="Armor"
              rows={[ {columns: [armor.name, armor.baseArmorClass.toString(), armor.type], description: armor.description } ]}
              headers={["Name", "Base armor class", "Damage type"]}
              showDescription
            />
        </>
    )
}