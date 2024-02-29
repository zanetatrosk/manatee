import { useAppSelector } from "@hooks/hooksStore";
import AttacksTable, { RowData } from "../components/attacksTable";
import { Feature } from "@pages/CreateCharacter/definitions/characterForm";

export default function FeaturesTab() {
  const {features} = useAppSelector((state) => state.character);
  return (
    <>
      <AttacksTable
        title="Features"
        rows={features?.map((f: Feature) => {
          return {
            columns: [f.title, f.levelMinimum.toString()],
            description: f.text,
          };
        })}
        headers={["Title", "Level gained"]}
        showDescription
      />
    </>
  );
}
