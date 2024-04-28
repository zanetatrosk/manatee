import { Grid } from "@mui/material";
import ProficienciesCard from "./proficienciesCard";
import Armor from "@assets/icons/armor";
import WeaponIcon from "@assets/icons/weapon";
import ToolsIcon from "@assets/icons/tools";
import LanguagesIcon from "@assets/icons/languages";
import { useAppSelector } from "@hooks/hooksStore";
import { CHARACTER_SHEET } from "constants/characterDefinition";

export default function OtherProficienciesTab() {
  const { languages, tools, armor, weapons } = useAppSelector(
    (state) => state.character.proficiencies,
  );
  const OTH_PROFICIENCIES = CHARACTER_SHEET.OTH_PROFICIENCIES;
  const data = [
    {
      title: OTH_PROFICIENCIES.ARMOR,
      data: OTH_PROFICIENCIES.NO_DATA,
      icon: <Armor />,
    },
    {
      title: OTH_PROFICIENCIES.WEAPONS,
      data: OTH_PROFICIENCIES.NO_DATA,
      icon: <WeaponIcon />,
    },
    {
      title: OTH_PROFICIENCIES.TOOLS,
      data: OTH_PROFICIENCIES.NO_DATA,
      icon: <ToolsIcon />,
    },
    {
      title: OTH_PROFICIENCIES.LANGUAGES,
      data: OTH_PROFICIENCIES.NO_DATA,
      icon: <LanguagesIcon />,
    },
  ];

  if (languages.length > 0) data[3].data = languages.join(", ");
  if (tools.length > 0) data[2].data = tools.join(", ");
  if (armor) data[0].data = armor.join(", ");
  if (weapons.length > 0) data[1].data = weapons.join(", ");

  return (
    <>
      <Grid container spacing={2}>
        {data.map((proficiency, index) => (
          <Grid item xs={12} key={index}>
            <ProficienciesCard
              title={proficiency.title}
              data={proficiency.data}
              icon={proficiency.icon}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
