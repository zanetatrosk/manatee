import { Grid } from "@mui/material";
import ProficiencyCard from "../tabsComponents/proficiencyCard";
import Armor from "@assets/icons/armor";
import WeaponIcon from "@assets/icons/weapon";
import ToolsIcon from "@assets/icons/tools";
import LanguagesIcon from "@assets/icons/languages";
import { useAppSelector } from "@hooks/hooksStore";

    
export default function OtherProficienciesTab() {
  const { languages, tools } = useAppSelector((state) => state.character);
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

  if(languages.length > 0) data[3].data = languages.map(l => l.item.name).join(", ");
  if(tools.length > 0) data[2].data = tools.map(t => t.item.name).join(", ");

  return (
    <>
      <Grid container spacing={2}>
        {data.map((proficiency, index) => (
            <Grid item xs={12} key={index}>
                <ProficiencyCard title={proficiency.title} data={proficiency.data} icon={proficiency.icon} />
            </Grid>
        ))}
      </Grid>
    </>
  );
}
