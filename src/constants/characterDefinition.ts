const NAVBAR = {
  NAME: "D&D APP",
  CHARACTERS: "Characters",
  CONTENT: "Content",
  USER_ACTIONS: {
    PROFILE: "Profile",
    LOGOUT: "Logout",
  },
};

const CHARACTERS = {
  HEADING: "My characters",
  VIEW: "View",
  DELETE: "Delete",
  EDIT: "Edit",
  NO_CHARACTERS: "No characters",
  CREATE_CHARACTER: "Create a new character",
  DELETE_CHARACTER: {
    DELETE: "Confirm",
    CANCEL: "Cancel",
    DELETE_CHARACTER: "Delete Character",
    DELETE_CHARACTER_TEXT: "Are you sure you want to delete this character?",
  },
};

const CREATE_CHARACTER = {
  BASIC_INFO: {
    HEADING: "Basic Information",
    CHARACTER_NAME: "Character Name",
    PLAYER_NAME: "Player Name",
    SOURCES: "Sources",
    CARD_PHOTO: "Card image url",
    IMAGES: "Images",
    SHEET_PHOTO: "Sheet image url",
  },

  CLASS: {
    HEADING: "Class",
    SUBTITLE: "Choose your class and you will get some features",
    PLACEHOLDER: "Barbarian, Bard, Cleric, ...",
    SUBCLASS: "Subclass",
    TOOLS: "Proficiency Tools",
    MESSAGE: "You can have up to ",
    TOOLS_PLACEHOLDER: "Thieves' Tools",
  },

  RACE: {
    HEADING: "Race",
    SUBTITLE: "Choose your race and you will get some features and languages",
    LANGUAGES: "Languages",
    MESSAGE: "You can have up to ",
    SIZE: "Size",
    PLACEHOLDER: "Elf, Dwarf, Human, ...",
    LANGUAGES_PLACEHOLDER: "Common, Elvish, Dwarvish, ...",
    FEAT_SPEED: "Speed",
    FT_SPEED_UNIT: " ft",
  },

  ABILITIES: {
    HEADING: "Abilities",
    SUBTITLE: "Choose your abilities",
    TABLE: {
      ABILITY: "Ability",
      SCORE: "Score",
      MODIFIER: "Modifier",
      UP_ONE: "Up +1",
      UP_TWO: "Up +2",
      TOTAL_SCORE: "Total score",
    },
  },

  BACKGROUND: {
    HEADING: "Background",
    PLACEHOLDER: "Acolyte, Criminal, ...",
    SUBTITLE: "Choose your background and you will get some features",
    LANGUAGES: "Languages",
    LANGUAGES_PLACEHOLDER: "Common",
    TOOLS: "Proficiency Tools",
    MESSAGE: "You can have up to ",
    TOOLS_PLACEHOLDER: "Thieves' Tools",
  },

  CARD_ACTIONS: {
    NEXT: "Next",
    BACK: "Back",
    FINISH: "Finish",
    SKIP: "Skip",
    FURTHER_INFO: "Further information",
    OPTIONAL: "Optional",
  },
};

const CHARACTER_SHEET = {
  HEADER: {
    PLAYER: "Player",
    RACE: "Race",
    CLASS_LEVEL: "Class & level",
    SUBCLASS: "Subclass",
    BACKGROUND: "Background",
  },
  MODAL_ADD: {
    ADD: "Add selected",
    CLOSE: "Close",
    SELECTED: "Selected",
  },
  SKILLS: "Skills",
  SAVING_THROWS: "Saving Throws",
  ACTIONS: {
    REMAKE_CHARACTER: "Remake Character",
    LEVEL_UP: "Level Up",
    BACK: "Back",
  },
  LEVEL_UP_MODAL: {
    FIRST_PART: "Are you sure you want to level up character",
    SECOND_PART: "to level",
  },
  STATS: {
    TITLE: "Stats",
    ARMOR_CLASS: "Armor Class",
    INITIATIVE: "Initiative",
    SPEED: "Speed",
    HIT_POINT_MAX: "Hit Point Max",
    PROF_BONUS: "Proficiency Bonus",
    HIT_DICE: "Hit Dice",
  },
  ATTACKS_AND_ARMOR: "Attacks and Armor",
  ATTACKS: {
    TITLE: "Attacks",
    HEADERS: {
      NAME: "Name",
      ATTACK_BONUS: "Attack bonus",
      DAMAGE_TYPE: "Damage/type",
    },
    ADD_ATTACK: "Add Attack",
  },
  ARMOR: {
    TITLE: "Armor",
    HEADERS: {
      NAME: "Name",
      BASE_ARMOR_CLASS: "Base Armor Class",
      TYPE: "Type",
    },
    ADD_ARMOR: "Change Armor",
  },
  FEATURES: {
    TITLE: "Features",
    HEADERS: {
      TITLE: "Title",
      LEVEL_GAINED: "Level gained",
    },
  },
  OTH_PROFICIENCIES: {
    TITLE: "Other Prof. & Languages",
    ARMOR: "Armor",
    WEAPONS: "Weapons",
    TOOLS: "Tools",
    LANGUAGES: "Languages",
    NO_DATA: "None",
  },
  SPELLCASTING: {
    TITLE: "Spellcasting",
    STATS_TITLE: "Spellcasting Stats",
    SLOTS_TITLE: "Spell Slots",
    SPELLS_TITLE: "Spells",
    ABILITY: "Ability",
    ATTACK_MODIFIER: "Attack mod.",
    SAVE_DC: "Save DC",
    VIEW_TABLE_HEADERS: {
      NAME: "Name",
      LEVEL: "Level",
      CASTING_TIME: "Casting time",
    },
    SLOTS_TABLE_HEADERS: {
      LEVEL: "Level",
      SLOTS_TOTAL: "Slots total",
    },
    ADD_SPELL: "Add spells",
  },
};

const COMMON = {
  QUESTION_MARK: "?",
};

const CONTENT = {
    HEADING: "Content Page",
}

const WELCOME = {
    HEADING: "Welcome to the D&D app",
};

export { CHARACTERS, CREATE_CHARACTER, NAVBAR, CHARACTER_SHEET, COMMON, CONTENT, WELCOME };
