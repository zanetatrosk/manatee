import { Autocomplete, Box, Divider, Grid, TextField } from "@mui/material";
import Typography  from "@mui/material/Typography";
import {CREATE_CHARACTER} from "constants/characterDefinition";
import CardInfo from "./cardInfo";
import { useAppSelector, useAppDispatch } from "@hooks/hooksStore";
import React, { useEffect } from "react";
import MultiComplete from "@components/customMultiComplete";
import { AutocompleteItem, Class } from "../definitions/characterForm";
import { setClass as setStoreClass } from "reducers/characterReducer";

const CLASS = CREATE_CHARACTER.CLASS;



export default function ClassFrame() {

  const classStore = useAppSelector((state) => state.character.characterClass);
  const dispatch = useAppDispatch();
  
  const [characterClass, setClass] = React.useState<Class>(classStore); 
  const [isVisible, setVisibility] = React.useState(false);
  const [toolsValue, setTools] = React.useState<AutocompleteItem[]>(classStore.tools.defaults);

  useEffect(() => {
    if( !characterClass.id ) return;
    const tmpClass = characterClass;
    setVisibility(true);
    dispatch(setStoreClass(tmpClass));
  }, [characterClass, dispatch]);

  return (
    <Box>
      <Grid container direction="column" pb={2}>
        <Grid item>
          <Typography gutterBottom variant="h4" component="div">
            {CLASS.HEADING}
          </Typography>
        </Grid>
        <Grid item>
          {!isVisible && (
            <Typography gutterBottom variant="body2" color="text.secondary">
              {CLASS.SUBTITLE}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item lg={7} xs={12}>
          <Autocomplete
            id="combo-box-demo"
            options={classes}
            value={characterClass}
            sx={{ my: 2 }}
            onChange={(_, value) => {
              if(!value || value?.id) return;
              setClass(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={CLASS.HEADING}
                variant="filled"
                placeholder={CLASS.PLACEHOLDER}
              />
            )}
          />
        </Grid>
      </Grid>
      <React.Fragment>
        {isVisible && (
          <div>
            <Box>
              <Divider sx={{ py: 2 }}>
                <Typography variant="overline" display="block" gutterBottom>
                  {CREATE_CHARACTER.CARD_ACTIONS.FURTHER_INFO}
                </Typography>
              </Divider>
            </Box>
            <Grid container sx={{ py: 2 }} columnSpacing={8}>
              <Grid item lg={6} xs={12} sx={{ py: 2 }}>
                <Autocomplete
                options={subclasses}
                value={characterClass.subclass}
                getOptionLabel={(option) => option.title}
                onChange={(_, value) => {
                  if( !value ) return;
                  setClass({...characterClass, subclass: value});
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={CLASS.SUBCLASS}
                    variant="filled" />
                )}
                />
              </Grid>
              <Grid item lg={6} xs={12} sx={{ py: 2 }}>
                <MultiComplete
                  values={proficiencyTools}
                  results={toolsValue}
                  onChange={setTools}
                  label={CLASS.TOOLS}
                  helpText={`Please choose ${characterClass.tools.amount} tools`}
                  placeholder={CLASS.TOOLS_PLACEHOLDER}
                  maxItems={characterClass.tools.amount}
                />
              </Grid>
            </Grid>
            <Box>
              <CardInfo
                title={characterClass.label}
                features={characterClass.features}
                description={characterClass.description}
              />
            </Box>
          </div>
        )}
      </React.Fragment>
    </Box>
  );
}

const classes: Class[] = [
  {
    id: 1,
    label: "Barbarian",
    hitDice: "1d12",
    subclass: { id: 1, title: "Berserker"},
    features: [
      {
        title: "Rage",
        text:
          "In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action. While raging, you gain the following benefits if you aren’t wearing heavy armor: You have advantage on Strength checks and Strength saving throws. When you make a melee weapon attack using Strength, you gain a bonus to the damage roll that increases as you gain levels as a barbarian, as shown in the Rage Damage column of the Barbarian table. You have resistance to bludgeoning, piercing, and slashing damage. If you are able to cast spells, you can’t cast them or concentrate on them while raging. Your rage lasts for 1 minute. It ends early if you are knocked unconscious or if your turn ends and you haven’t attacked a hostile creature since your last turn or taken damage since then. You can also end your rage on your turn as a bonus action. Once you have raged the number of times shown for your barbarian level in the Rages column of the Barbarian table, you must finish a long rest before you can rage again.",
      },
      {
        title: "Unarmored Defense",
        text:
          "While you are not wearing any armor, your Armor Class equals 10 + your Dexterity modifier + your Constitution modifier. You can use a shield and still gain this benefit.",
      },
    ],
    description:
      "For some, their rage springs from a communion with fierce animal spirits. Others draw from a roiling reservoir of anger at a world full of pain. For every barbarian, rage is a power that fuels not just a battle frenzy but also uncanny reflexes, resilience, and feats of strength.",
    tools: {
      amount: 0,
      defaults: [],
    },
  },
  {
    id: 2,
    label: "Bard",
    hitDice: "1d8",
    subclass: { id: 2, title: "Lore"},
    features: [
      {
        title: "Spellcasting",
        text:
          "You have learned to untangle and reshape the fabric of reality in harmony with your wishes and music. Your spells are part of your vast repertoire, magic that you can tune to different situations. See chapter 10 for the general rules of spellcasting and chapter 11 for the bard spell list.",
      },
      {
        title: "Bardic Inspiration",
        text:
          "You can inspire others through stirring words or music. To do so, you use a bonus action on your turn to choose one creature other than yourself within 60 feet of you who can hear you. That creature gains one Bardic Inspiration die, a d6. Once within the next 10 minutes, the creature can roll the die and add the number rolled to one ability check, attack roll, or saving throw it makes. The creature can wait until after it rolls the d20 before deciding to use the Bardic Inspiration die, but must decide before the DM says whether the roll succeeds or fails. Once the Bardic Inspiration die is rolled, it is lost. A creature can have only one Bardic Inspiration die at a time. You can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
      },
    ],
    description:
      "Humming as she traces her fingers over an ancient monument in a long-forgotten ruin, a half-elf in rugged leathers finds knowledge springing into her mind, conjured forth by the magic of her song—knowledge of the people who constructed the monument and the mythic saga it depicts.",
    
    tools: {
      amount: 0,
      defaults: [],
    },
  },
];

const proficiencyTools: AutocompleteItem[] = [
  { id: 1, title: "Alchemist’s Supplies" },
  { id: 2, title: "Brewer’s Supplies" },
  { id: 3, title: "Calligrapher’s Supplies" },
  { id: 4, title: "Carpenter’s Tools" },
  { id: 5, title: "Cartographer’s Tools" },
  { id: 6, title: "Cobbler’s Tools" },
  { id: 7, title: "Cook’s Utensils" },
  { id: 8, title: "Glassblower’s Tools" },
  { id: 9, title: "Jeweler’s Tools" },
  { id: 10, title: "Leatherworker’s Tools" },
  { id: 11, title: "Mason’s Tools" },
  { id: 12, title: "Painter’s Supplies" },
  { id: 13, title: "Potter’s Tools" },
  { id: 14, title: "Smith’s Tools" },
  { id: 15, title: "Tinker’s Tools" },
  { id: 16, title: "Weaver’s Tools" },
  { id: 17, title: "Woodcarver’s Tools" },
  { id: 18, title: "Disguise Kit" },
  { id: 19, title: "Forgery Kit" },
  { id: 20, title: "Herbalism Kit" },
  { id: 21, title: "Navigator’s Tools" },
  { id: 22, title: "Poisoner’s Kit" },
  { id: 23, title: "Thieves’ Tools" },
  { id: 24, title: "Dice Set" },
  { id: 25, title: "Dragonchess Set" },
  { id: 26, title: "Playing Card Set" },
  { id: 27, title: "Three-Dragon Ante Set" },
  { id: 28, title: "Land Vehicles" },
  { id: 29, title: "Water Vehicles" },
];

const subclasses : AutocompleteItem[] = [
  {id: 1, title: "Berserker"},
  {id: 2, title: "Lore"},
  {id: 3, title: "Valor"},
  {id: 4, title: "Swords"},
  {id: 5, title: "Whispers"},
  {id: 6, title: "Glamour"},
  {id: 7, title: "Swords"},
  {id: 8, title: "Whispers"},
  {id: 9, title: "Glamour"},
  {id: 10, title: "Swords"},
  {id: 11, title: "Whispers"},
  {id: 12, title: "Glamour"},
  {id: 13, title: "Swords"},
  {id: 14, title: "Whispers"},
  {id: 15, title: "Glamour"},
  {id: 16, title: "Swords"},
  {id: 17, title: "Whispers"},
  {id: 18, title: "Glamour"},
  {id: 19, title: "Swords"},
  {id: 20, title: "Whispers"},
  {id: 21, title: "Glamour"},
  {id: 22, title: "Swords"},
  {id: 23, title: "Whispers"},
  {id: 24, title: "Glamour"},
  {id: 25, title: "Swords"},
  {id: 26, title: "Whispers"},
  {id: 27, title: "Glamour"},
  {id: 28, title: "Swords"},
  {id: 29, title: "Whispers"},
  {id: 30, title: "Glamour"},
  {id: 31, title: "Swords"}
]