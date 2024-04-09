import { Grid } from "@mui/material";
import ProficienciesCard from "./components/proficienciesCard";
import Armor from "@assets/icons/armor";
import WeaponIcon from "@assets/icons/weapon";
import ToolsIcon from "@assets/icons/tools";
import LanguagesIcon from "@assets/icons/languages";
import { useAppSelector } from "@hooks/hooksStore";

    
export default function OtherProficienciesTab() {
  const { languages, tools, armor, weapons  } = useAppSelector((state) => state.character.proficiencies);
  const data = [
      { 
          title: "Armor",
          data: "None",
          icon: <Armor/>
      },
      { 
          title: "Weapons",
          data: "None",
          icon: <WeaponIcon/>
      },
      { 
          title: "Tools",
          data: "None",
          icon: <ToolsIcon/>
      },
      { 
          title: "Languages",
          data: "None",
          icon: <LanguagesIcon/>
      }
  ]

  if(languages.length > 0) data[3].data = languages.join(", ");
  if(tools.length > 0) data[2].data = tools.join(", ");
  if(armor) data[0].data = armor.join(", ");
  if(weapons.length > 0) data[1].data = weapons.join(", ");

  return (
    <>
      <Grid container spacing={2}>
        {data.map((proficiency, index) => (
            <Grid item xs={12} key={index}>
                <ProficienciesCard title={proficiency.title} data={proficiency.data} icon={proficiency.icon} />
            </Grid>
        ))}
      </Grid>
    </>
  );
}
