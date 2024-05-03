import SkillTable, { RowSkillData } from "@components/skillTable";
import { Skill } from "@definitions/characterSheet";
import { Grid } from "@mui/material";
import { usePostSkillsByCharacterIdMutation } from "api/charactersApiSlice";
import { CHARACTER_SHEET } from "constants/characterDefinition";
import React from "react";
import { useParams } from "react-router-dom";


export default function Skills({ skills }: { skills: Skill[] }) {
  const { id } = useParams();
  const [postSkillsByCharacterId] = usePostSkillsByCharacterIdMutation();
  const [skillsGiven, setSkillsGiven] = React.useState<RowSkillData[]>(
    skills.map((i) => ({
      id: i.label,
      label: i.displayName,
      modifier: i.modifier,
      checked: i.proficient,
    })),
  );
  if (!id) return null;

  const saveSkills = (skillsGiven: RowSkillData[]) => {
    const proficiencySkills = skillsGiven.map((i) => {
      return {
        name: i.id,
        proficient: i.checked,
      };
    });
    postSkillsByCharacterId({ id: id, skills: proficiencySkills })
      .unwrap()
      .then((data: Skill[]) => {
        setSkillsGiven(
          data.map((i) => ({
            id: i.label,
            label: i.displayName,
            modifier: i.modifier,
            checked: i.proficient,
          })),
        );
      });
  };

  return (
    <>
      <Grid item>
        <SkillTable
          name={CHARACTER_SHEET.SKILLS}
          sendData={saveSkills}
          tableData={skillsGiven}
          key={skillsGiven.length}
        />
      </Grid>
    </>
  );
}
