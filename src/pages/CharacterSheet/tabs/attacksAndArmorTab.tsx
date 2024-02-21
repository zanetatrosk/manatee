import AttacksTable, { RowData } from "../components/attacksTable";

const rows: RowData[] = [
    {
      columns: ["Longsword", "+5", "Slashing"],
      description: "lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    {
      columns: ["Dagger", "+3", "Piercing"],
      description: "lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    {
      columns: ["Fireball", "+8", "Fire"],
      description: "lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
  ];
export default function AttacksAndArmorTab(){
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
              rows={rows}
              headers={["Name", "Attack bonus", "Damage type"]}
              showDescription
            />
        </>
    )
}