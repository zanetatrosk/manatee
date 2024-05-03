import { Grid } from "@mui/material";
import ProficienciesCard from "./proficienciesCard";
import ArmorIcon from "@assets/icons/armor";
import WeaponIcon from "@assets/icons/weapon";
import ToolsIcon from "@assets/icons/tools";
import LanguagesIcon from "@assets/icons/languages";
import { useAppSelector } from "@hooks/hooksStore";
import { CHARACTER_SHEET } from "constants/characterDefinition";

export default function OtherProficienciesTab() {
  const { languages, tools, armor, weapons } = useAppSelector(
    (state) => state.character.proficiencies,
  );
  const join = (arr: string[]) => arr.join(", ") || OTH_PROFICIENCIES.NO_DATA;
  const OTH_PROFICIENCIES = CHARACTER_SHEET.OTH_PROFICIENCIES;
  const data = [
    {
      title: OTH_PROFICIENCIES.ARMOR,
      data: join(languages),
      icon: <ArmorIcon />,
    },
    {
      title: OTH_PROFICIENCIES.WEAPONS,
      data: join(weapons),
      icon: <WeaponIcon />,
    },
    {
      title: OTH_PROFICIENCIES.TOOLS,
      data: join(tools),
      icon: <ToolsIcon />,
    },
    {
      title: OTH_PROFICIENCIES.LANGUAGES,
      data: join(armor),
      icon: <LanguagesIcon />,
    },
  ];

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
