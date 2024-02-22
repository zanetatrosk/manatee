import { useAppSelector } from "@hooks/hooksStore";
import AttacksTable, { RowData } from "../components/attacksTable";
import { features } from "process";
import { Feature } from "@pages/CreateCharacter/definitions/characterForm";

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
  const {features} = useAppSelector((state) => state.character);
  return (
    <>
      <AttacksTable
        title="Features"
        rows={features?.map((f: Feature) => {
          return {
            columns: [f.title, f.levelMinimum?.toString() || "Not known"],
            description: f.text,
          };
        })}
        headers={["title", "level minimum"]}
        showDescription
      />
    </>
  );
}
