import { useAppSelector } from "@hooks/hooksStore";
import CrudTable, { RowData } from "../../../components/crudTable";
import { Feature } from "definitions/characterForm";

export default function FeaturesTab() {
  const {features} = useAppSelector((state) => state.character);
  return (
    <>
      <CrudTable
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
