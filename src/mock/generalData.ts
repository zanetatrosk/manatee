import { AutocompleteItem, Background, Class, Race } from "@pages/CreateCharacter/definitions/characterForm";


const races: Race[] = [
    {
    id: "1",
    name: "Dwarf",
    languageProficiencies: {
        amount: 2,
        defaults: [{ id: "1", name: "Common Dwarvish" }],
    },
    description:
        "Bold and hardy, dwarves are known as skilled warriors, miners, and workers of stone and metal.",
    speed: 25,
    features: [
        {
        title: "Darkvision",
        text: "...",
        levelMinimum: 1,
        },
        {
        title: "Dwarven Resilience",
        text: "...",
        levelMinimum: 1,
        },
    ],
    abilityScorePlus2: ["CONSTITUTION"],
    sizeOptions: ["Medium"],
    },
    {
    id: "2",
    name: "Elf",
    languageProficiencies: {
        amount: 2,
        defaults: [
        { id: "1", name: "Common Elvish" },
        { id: "2", name: "High Elvish" },
        ],
    },
    description:
        "Elves are a magical people of otherworldly grace, living in the world but not entirely part of it.",
    speed: 30,
    features: [
        {
        title: "Darkvision",
        text: "...",
        levelMinimum: 1,
        },
        {
        title: "Fey Ancestry",
        text: "The elf has advantage on saving throws against being charmed, and magic can’t put the elf to sleep.",
        levelMinimum: 1,
        },
        {
        title: "Skill Versatility",
        text: "...",
        levelMinimum: 1,
        },
    ],
    abilityScorePlus2: ["DEXTERITY"],
    sizeOptions: ["Medium"],
    },
    {
    id: "3",
    name: "Halfling",
    languageProficiencies: {
        amount: 2,
        defaults: [
        { id: "8", name: "Common Draconic" },
        { id: "9", name: "High Draconic" },
        ],
    },
    description:
        "The diminutive halflings survive in a world full of larger creatures by avoiding notice or, barring that, avoiding offense.",
    speed: 25,
    features: [
        {
        title: "Lucky",
        text: "...",
        levelMinimum: 1,
        },
        {
        title: "Brave",
        text: "...",
        levelMinimum: 1,
        },
        {
        title: "Halfling Nimbleness",
        text: "...",
        levelMinimum: 1,
        },
    ],
    abilityScorePlus2: ["DEXTERITY"],
    sizeOptions: ["Small"],
    },
    {
    id: "4",
    name: "Human",
    languageProficiencies: {
        amount: 1,
        defaults: [{ id: "1", name: "Common Elvish" }],
    },
    description: "The Human is ",
    speed: 30,
    features: [],
    abilityScorePlus2: [],
    sizeOptions: ["Medium"],
    },
];

const backgrounds: Background[] = [
    {
      id: "1",
      name: "Acolyte",
      languageProficiencies: {
        amount: 1,
        defaults: [
          { id: "1", name: "Common" },
        ],
      },
      toolProficiencies: {
        amount: 1,
        defaults: [],
      },
      description:
        "You have spent your life in the service of a temple to a specific god or pantheon of gods. You act as an intermediary between the realm of the holy and the mortal world, performing sacred rites and offering sacrifices in order to conduct worshipers into the presence of the divine. You are not necessarily a cleric—performing sacred rites is not the same thing as channeling divine power.",
      features: [
        {
          title: "Shelter of the Faithful",
          text: "As an acolyte, you command the respect of those who share your faith, and you can perform the religious ceremonies of your deity. You and your adventuring companions can expect to receive free healing and care at a temple, shrine, or other established presence of your faith, though you must provide any material components needed for spells. Those who share your religion will support you (but only you) at a modest lifestyle.",
          levelMinimum: 1,
        },
      ],
    },
    {
      id: "2",
      name: "Charlatan",
      languageProficiencies: {
        amount: 0,
        defaults: [],
      },
      toolProficiencies: {
        amount: 0,
        defaults: [],
      },
      description:
        "You have always had a way with people. You know what makes them tick, you can tease out their hearts' desires after a few minutes of conversation, and with a few leading questions you can read them like they were children's books. It's a useful talent, and one that you're perfectly willing to use for your advantage.",
      features: [
        {
          title: "False Identity",
          text: "You have created a second identity that includes documentation, established acquaintances, and disguises that allow you to assume that persona. Additionally, you can forge documents including official papers and personal letters, as long as you have seen an example of the kind of document or the handwriting you are trying to copy.",
          levelMinimum: 1
        },
      ],
    },
  ];

const languages: AutocompleteItem[] = [
// Elvish languages
{ id: "1", name: "Common Elvish" },
{ id: "2", name: "High Elvish" },
{ id: "3", name: "Wood Elvish" },
{ id: "4", name: "Drow Sign Language" },

// Dwarvish languages
{ id: "5", name: "Common Dwarvish" },
{ id: "6", name: "Hill Dwarvish" },
{ id: "7", name: "Mountain Dwarvish" },

// Draconic languages
{ id: "8", name: "Common Draconic" },
{ id: "9", name: "High Draconic" },
{ id: "10", name: "Ancient Draconic" },

// Gnomish languages
{ id: "11", name: "Common Gnomish" },
{ id: "12", name: "Rock Gnomish" },
{ id: "13", name: "Forest Gnomish" },

// Orcish languages
{ id: "14", name: "Common Orcish" },
{ id: "15", name: "Black Orcish" },
{ id: "16", name: "Gray Orcish" },

// Celestial languages
{ id: "17", name: "Common Celestial" },
{ id: "18", name: "High Celestial" },

// Infernal languages
{ id: "19", name: "Common Infernal" },
{ id: "20", name: "High Infernal" },

// Abyssal languages
{ id: "21", name: "Common Abyssal" },
{ id: "22", name: "High Abyssal" },

// Giant languages
{ id: "23", name: "Common Giant" },
{ id: "24", name: "Hill Giant" },
{ id: "25", name: "Stone Giant" },

// Undercommon languages
{ id: "26", name: "Common Undercommon" },
{ id: "27", name: "High Undercommon" },
  ];

const sources: AutocompleteItem[] = [
{ id: "0", name: "Player's Handbook" },
{ id: "1", name: "Dungeon Master's Guide" },
{ id: "2", name: "Monster Manual" },
{ id: "3", name: "Volo's Guide to Monsters" },
{ id: "4", name: "Mordenkainen's Tome of Foes" },
{ id: "5", name: "Xanathar's Guide to Everything" },
{ id: "6", name: "Guildmasters' Guide to Ravnica" },
{ id: "7", name: "Acquisitions Incorporated" },
{ id: "8", name: "Eberron: Rising from the Last War" },
{ id: "9", name: "Explorer's Guide to Wildemount" },
{ id: "10", name: "Mythic Odysseys of Theros" },
{ id: "11", name: "Tasha's Cauldron of Everything" },
{ id: "12", name: "Van Richten's Guide to Ravenloft" },
{ id: "13", name: "Fizban's Treasury of Dragons" },
{ id: "14", name: "Strixhaven: A Curriculum of Chaos" },
{ id: "15", name: "The Wild Beyond the Witchlight" },
  ];

  const classes: Class[] = [
    {
      id: "1",
      name: "Barbarian",
      hitDice: "1d12",
      subclasses: ["Berserker"],
      features: [
        {
          title: "Rage",
          text:
            "In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action. While raging, you gain the following benefits if you aren’t wearing heavy armor: You have advantage on Strength checks and Strength saving throws. When you make a melee weapon attack using Strength, you gain a bonus to the damage roll that increases as you gain levels as a barbarian, as shown in the Rage Damage column of the Barbarian table. You have resistance to bludgeoning, piercing, and slashing damage. If you are able to cast spells, you can’t cast them or concentrate on them while raging. Your rage lasts for 1 minute. It ends early if you are knocked unconscious or if your turn ends and you haven’t attacked a hostile creature since your last turn or taken damage since then. You can also end your rage on your turn as a bonus action. Once you have raged the number of times shown for your barbarian level in the Rages column of the Barbarian table, you must finish a long rest before you can rage again.",
          levelMinimum: 1,
          },
        {
          title: "Unarmored Defense",
          text:
            "While you are not wearing any armor, your Armor Class equals 10 +T your Dexterity modifier + your Constitution modifier. You can use a shield and still gain this benefit.",
          levelMinimum: 1,
          },
      ],
      description:
        "For some, their rage springs from a communion with fierce animal spirits. Others draw from a roiling reservoir of anger at a world full of pain. For every barbarian, rage is a power that fuels not just a battle frenzy but also uncanny reflexes, resilience, and feats of strength.",
      toolProficiencies: {
        amount: 2,
        defaults: [],
      },
    },
    {
      id: "2",
      name: "Bard",
      hitDice: "1d8",
      subclasses: ["Lore", "Valor"],
      features: [
        {
          title: "Spellcasting",
          text:
            "You have learned to untangle and reshape the fabric of reality in harmony with your wishes and music. Your spells are part of your vast repertoire, magic that you can tune to different situations. See chapter 10 for the general rules of spellcasting and chapter 11 for the bard spell list.",
          levelMinimum: 1,
          },
        {
          title: "Bardic Inspiration",
          text:
            "You can inspire others through stirring words or music. To do so, you use a bonus action on your turn to choose one creature other than yourself within 60 feet of you who can hear you. That creature gains one Bardic Inspiration die, a d6. Once within the next 10 minutes, the creature can roll the die and add the number rolled to one ability check, attack roll, or saving throw it makes. The creature can wait until after it rolls the d20 before deciding to use the Bardic Inspiration die, but must decide before the DM says whether the roll succeeds or fails. Once the Bardic Inspiration die is rolled, it is lost. A creature can have only one Bardic Inspiration die at a time. You can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
          levelMinimum: 1,
          },
      ],
      description:
        "Humming as she traces her fingers over an ancient monument in a long-forgotten ruin, a half-elf in rugged leathers finds knowledge springing into her mind, conjured forth by the magic of her song—knowledge of the people who constructed the monument and the mythic saga it depicts.",
      
      toolProficiencies: {
        amount: 0,
        defaults: [],
      },
    },
  ];

  const proficiencyTools: AutocompleteItem[] = [
    { id: "1", name: "Alchemist’s Supplies" },
    { id: "2", name: "Brewer’s Supplies" },
    { id: "3", name: "Calligrapher’s Supplies" },
    { id: "4", name: "Carpenter’s Tools" },
    { id: "5", name: "Cartographer’s Tools" },
    { id: "6", name: "Cobbler’s Tools" },
    { id: "7", name: "Cook’s Utensils" },
    { id: "8", name: "Glassblower’s Tools" },
    { id: "9", name: "Jeweler’s Tools" },
    { id: "10", name: "Leatherworker’s Tools" },
    { id: "11", name: "Mason’s Tools" },
    { id: "12", name: "Painter’s Supplies" },
    { id: "13", name: "Potter’s Tools" },
    { id: "14", name: "Smith’s Tools" },
    { id: "15", name: "Tinker’s Tools" },
    { id: "16", name: "Weaver’s Tools" },
    { id: "17", name: "Woodcarver’s Tools" },
    { id: "18", name: "Disguise Kit" },
    { id: "19", name: "Forgery Kit" },
    { id: "20", name: "Herbalism Kit" },
    { id: "21", name: "Navigator’s Tools" },
    { id: "22", name: "Poisoner’s Kit" },
    { id: "23", name: "Thieves’ Tools" },
    { id: "24", name: "Dice Set" },
    { id: "25", name: "Dragonchess Set" },
    { id: "26", name: "Playing Card Set" },
    { id: "27", name: "Three-Dragon Ante Set" },
    { id: "28", name: "Land Vehicles" },
    { id: "29", name: "Water Vehicles" },
  ];
  
  const subclasses : string[] = [
    "Berserker",
    "Lore",
    "Valor",
   
  ]
  
export {races, backgrounds, languages, sources, proficiencyTools, classes, subclasses}