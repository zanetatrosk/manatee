import { useAppSelector } from "@hooks/hooksStore";
import CrudTable from "../../../components/crudTable";
import { Feature } from "definitions/characterForm";
import { CHARACTER_SHEET } from "constants/characterDefinition";

export default function FeaturesTab() {
  const { features } = useAppSelector((state) => state.character);
  const FEATURES = CHARACTER_SHEET.FEATURES;
  return (
    <>
      <CrudTable
        title={CHARACTER_SHEET.FEATURES.TITLE}
        rows={features?.map((f: Feature) => {
          return {
            columns: [f.title, f.levelMinimum.toString()],
            description: f.text,
          };
        })}
        headers={[FEATURES.HEADERS.TITLE, FEATURES.HEADERS.LEVEL_GAINED]}
        showDescription
      />
    </>
  );
}
