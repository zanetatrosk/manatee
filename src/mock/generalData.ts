import { AutocompleteItem, Background, Class, Race } from "@pages/CreateCharacter/definitions/characterForm";


const races: Race[] = [
    {
    id: 1,
    label: "Dwarf",
    languages: {
        amount: 2,
        defaults: [{ id: 5, title: "Common Dwarvish" }],
    },
    description:
        "Bold and hardy, dwarves are known as skilled warriors, miners, and workers of stone and metal.",
    speed: 25,
    features: [
        {
        title: "Darkvision",
        text: "As an action, you touch a stone object no larger than 3 feet in any dimension and imbue it with magic. For the duration, the object sheds bright light in a 20-foot radius and dim light for an additional 20 feet. If you chose a sphere, the radius is doubled. Once used, this trait can’t be used again until you finish a long rest.",
        },
        {
        title: "Dwarven Resilience",
        text: "The hit point maximum of a dwarf is increased by 1, and it increases by 1 every time the dwarf gains a level.",
        },
        {
        title: "Dwarven Combat Training",
        text: "As an action, you can touch a piece of nonmagical metal and imbue it with one of your smith’s specialties, as if you had cast the magic weapon spell on it. For the purpose of this trait, a martial weapon is a melee or ranged weapon that requires an Attack roll, and a ranged weapon is any weapon that can be used to make a ranged Attack.",
        },
        {
        title: "Tool Proficiency",
        text: "This trait grants you proficiency with the artisan’s tools of your choice: smith’s tools, brewer’s supplies, or mason’s tools.",
        },
        {
        title: "Stonecunning",
        text: "The dwarf has advantage on Intelligence (History) checks related to the origin of stonework, and it can make such checks untrained.",
        },
    ],
    abilityScorePlus2: ["CONSTITUTION"],
    sizeOptions: ["Medium"],
    },
    {
    id: 2,
    label: "Elf",
    languages: {
        amount: 2,
        defaults: [
        { id: 1, title: "Common Elvish" },
        { id: 2, title: "High Elvish" },
        ],
    },
    description:
        "Elves are a magical people of otherworldly grace, living in the world but not entirely part of it.",
    speed: 30,
    features: [
        {
        title: "Darkvision",
        text: "...",
        },
        {
        title: "Fey Ancestry",
        text: "The elf has advantage on saving throws against being charmed, and magic can’t put the elf to sleep.",
        },
        {
        title: "Skill Versatility",
        text: "...",
        },
    ],
    abilityScorePlus2: ["DEXTERITY"],
    sizeOptions: ["Medium"],
    },
    {
    id: 3,
    label: "Halfling",
    languages: {
        amount: 2,
        defaults: [
        { id: 8, title: "Common Draconic" },
        { id: 9, title: "High Draconic" },
        ],
    },
    description:
        "The diminutive halflings survive in a world full of larger creatures by avoiding notice or, barring that, avoiding offense.",
    speed: 25,
    features: [
        {
        title: "Lucky",
        text: "...",
        },
        {
        title: "Brave",
        text: "...",
        },
        {
        title: "Halfling Nimbleness",
        text: "...",
        },
    ],
    abilityScorePlus2: ["DEXTERITY"],
    sizeOptions: ["Small"],
    },
    {
    id: 4,
    label: "Human",
    languages: {
        amount: 1,
        defaults: [{ id: 1, title: "Common Elvish" }],
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
      id: 1,
      label: "Acolyte",
      languages: {
        amount: 2,
        defaults: [
          { id: 1, title: "Common" },
          { id: 17, title: "Celestial" },
        ],
      },
      tools: {
        amount: 0,
        defaults: [],
      },
      description:
        "You have spent your life in the service of a temple to a specific god or pantheon of gods. You act as an intermediary between the realm of the holy and the mortal world, performing sacred rites and offering sacrifices in order to conduct worshipers into the presence of the divine. You are not necessarily a cleric—performing sacred rites is not the same thing as channeling divine power.",
      features: [
        {
          title: "Shelter of the Faithful",
          text: "As an acolyte, you command the respect of those who share your faith, and you can perform the religious ceremonies of your deity. You and your adventuring companions can expect to receive free healing and care at a temple, shrine, or other established presence of your faith, though you must provide any material components needed for spells. Those who share your religion will support you (but only you) at a modest lifestyle.",
        },
      ],
    },
    {
      id: 2,
      label: "Charlatan",
      languages: {
        amount: 0,
        defaults: [],
      },
      tools: {
        amount: 0,
        defaults: [],
      },
      description:
        "You have always had a way with people. You know what makes them tick, you can tease out their hearts' desires after a few minutes of conversation, and with a few leading questions you can read them like they were children's books. It's a useful talent, and one that you're perfectly willing to use for your advantage.",
      features: [
        {
          title: "False Identity",
          text: "You have created a second identity that includes documentation, established acquaintances, and disguises that allow you to assume that persona. Additionally, you can forge documents including official papers and personal letters, as long as you have seen an example of the kind of document or the handwriting you are trying to copy.",
        },
      ],
    },
  ];

const languages: AutocompleteItem[] = [
// Elvish languages
{ id: 1, title: "Common Elvish" },
{ id: 2, title: "High Elvish" },
{ id: 3, title: "Wood Elvish" },
{ id: 4, title: "Drow Sign Language" },

// Dwarvish languages
{ id: 5, title: "Common Dwarvish" },
{ id: 6, title: "Hill Dwarvish" },
{ id: 7, title: "Mountain Dwarvish" },

// Draconic languages
{ id: 8, title: "Common Draconic" },
{ id: 9, title: "High Draconic" },
{ id: 10, title: "Ancient Draconic" },

// Gnomish languages
{ id: 11, title: "Common Gnomish" },
{ id: 12, title: "Rock Gnomish" },
{ id: 13, title: "Forest Gnomish" },

// Orcish languages
{ id: 14, title: "Common Orcish" },
{ id: 15, title: "Black Orcish" },
{ id: 16, title: "Gray Orcish" },

// Celestial languages
{ id: 17, title: "Common Celestial" },
{ id: 18, title: "High Celestial" },

// Infernal languages
{ id: 19, title: "Common Infernal" },
{ id: 20, title: "High Infernal" },

// Abyssal languages
{ id: 21, title: "Common Abyssal" },
{ id: 22, title: "High Abyssal" },

// Giant languages
{ id: 23, title: "Common Giant" },
{ id: 24, title: "Hill Giant" },
{ id: 25, title: "Stone Giant" },

// Undercommon languages
{ id: 26, title: "Common Undercommon" },
{ id: 27, title: "High Undercommon" },
  ];

const sources: AutocompleteItem[] = [
{ id: 0, title: "Player's Handbook" },
{ id: 1, title: "Dungeon Master's Guide" },
{ id: 2, title: "Monster Manual" },
{ id: 3, title: "Volo's Guide to Monsters" },
{ id: 4, title: "Mordenkainen's Tome of Foes" },
{ id: 5, title: "Xanathar's Guide to Everything" },
{ id: 6, title: "Guildmasters' Guide to Ravnica" },
{ id: 7, title: "Acquisitions Incorporated" },
{ id: 8, title: "Eberron: Rising from the Last War" },
{ id: 9, title: "Explorer's Guide to Wildemount" },
{ id: 10, title: "Mythic Odysseys of Theros" },
{ id: 11, title: "Tasha's Cauldron of Everything" },
{ id: 12, title: "Van Richten's Guide to Ravenloft" },
{ id: 13, title: "Fizban's Treasury of Dragons" },
{ id: 14, title: "Strixhaven: A Curriculum of Chaos" },
{ id: 15, title: "The Wild Beyond the Witchlight" },
  ];

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
   
  ]
  
export {races, backgrounds, languages, sources, proficiencyTools, classes, subclasses}