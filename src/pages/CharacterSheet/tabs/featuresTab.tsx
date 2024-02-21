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

export default function FeaturesTab() {
  return (
    <div>
      <AttacksTable
        title="Features"
        rows={rows}
        headers={["Name", "Attack bonus", "Damage type"]}
        showDescription
      />
    </div>
  );
}
