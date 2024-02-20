import { Grid } from "@mui/material";
import ProficiencyCard from "../tabsComponents/proficiencyCard";
import Armor from "@assets/icons/armor";
import WeaponIcon from "@assets/icons/weapon";
import ToolsIcon from "@assets/icons/tools";
import LanguagesIcon from "@assets/icons/languages";

    
const data = [
    { 
        title: "Armor",
        data: "Light Armor, Medium Armor, Shields",
        icon: <Armor/>
    },
    { 
        title: "Weapons",
        data: "Simple Weapons, Martial Weapons",
        icon: <WeaponIcon/>
    },
    { 
        title: "Tools",
        data: "None",
        icon: <ToolsIcon/>
    },
    { 
        title: "Languages",
        data: "Common, Elvish",
        icon: <LanguagesIcon/>
    }
]
export default function OtherProficienciesTab() {
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
