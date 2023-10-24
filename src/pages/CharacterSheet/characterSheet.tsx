import React, { useState } from 'react';
import SkillTable from './components/skillTable';

interface CharacterSheetProps {
    // Define any props that your component needs here
}

const CharacterSheet: React.FC<CharacterSheetProps> = (props) => {
    // Define any state that your component needs here using useState
    const [characterName, setCharacterName] = useState('');
    const [classAndLevel, setClassAndLevel] = useState('');
    const [background, setBackground] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [race, setRace] = useState('');
    const [alignment, setAlignment] = useState('');
    const [experiencePoints, setExperiencePoints] = useState(0);
    const [strength, setStrength] = useState(0);
    const [dexterity, setDexterity] = useState(0);
    const [constitution, setConstitution] = useState(0);
    const [intelligence, setIntelligence] = useState(0);
    const [wisdom, setWisdom] = useState(0);
    const [charisma, setCharisma] = useState(0);

    return (
        <div>
            <div>
                <div>
                    <label>Character Name:</label>
                    <input type="text" value={characterName} onChange={(e) => setCharacterName(e.target.value)} />
                </div>
                <div>
                    <label>Class and Level:</label>
                    <input type="text" value={classAndLevel} onChange={(e) => setClassAndLevel(e.target.value)} />
                </div>
                <div>
                    <label>Background:</label>
                    <input type="text" value={background} onChange={(e) => setBackground(e.target.value)} />
                </div>
                <div>
                    <label>Player Name:</label>
                    <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
                </div>
                <div>
                    <label>Race:</label>
                    <input type="text" value={race} onChange={(e) => setRace(e.target.value)} />
                </div>
                <div>
                    <label>Alignment:</label>
                    <input type="text" value={alignment} onChange={(e) => setAlignment(e.target.value)} />
                </div>
                <div>
                    <label>Experience Points:</label>
                    <input type="number" value={experiencePoints} onChange={(e) => setExperiencePoints(parseInt(e.target.value))} />
                </div>
            </div>
            <div>
                <div>
                    <label>Strength:</label>
                    <input type="number" value={strength} onChange={(e) => setStrength(parseInt(e.target.value))} />
                </div>
                <div>
                    <label>Dexterity:</label>
                    <input type="number" value={dexterity} onChange={(e) => setDexterity(parseInt(e.target.value))} />
                </div>
                <div>
                    <label>Constitution:</label>
                    <input type="number" value={constitution} onChange={(e) => setConstitution(parseInt(e.target.value))} />
                </div>
                <div>
                    <label>Intelligence:</label>
                    <input type="number" value={intelligence} onChange={(e) => setIntelligence(parseInt(e.target.value))} />
                </div>
                <div>
                    <label>Wisdom:</label>
                    <input type="number" value={wisdom} onChange={(e) => setWisdom(parseInt(e.target.value))} />
                </div>
                <div>
                    <label>Charisma:</label>
                    <input type="number" value={charisma} onChange={(e) => setCharisma(parseInt(e.target.value))} />
                </div>
            </div>
            <div>
                <div>
                    <label>Inspiration:</label>
                    <input type="checkbox" />
                </div>
                <div>
                    <label>Proficiency Bonus:</label>
                    <input type="number" />
                </div>
                <div>
                    <label>Saving Throws:</label>
                    <input type="text" />
                </div>
                <div>
                    <label>Skills:</label>
                    <input type="text" />
                </div>
                <div>
                    <label>Passive Wisdom (Perception):</label>
                    <input type="number" />
                </div>
            </div>
            <div>
                <div>
                    <label>Armor Class:</label>
                    <input type="number" />
                </div>
                <div>
                    <label>Initiative:</label>
                    <input type="number" />
                </div>
                <div>
                    <label>Speed:</label>
                    <input type="number" />
                </div>
                <div>
                    <label>Hit Point Maximum:</label>
                    <input type="number" />
                </div>
                <div>
                    <label>Current Hit Points:</label>
                    <input type="number" />
                </div>
                <div>
                    <label>Temporary Hit Points:</label>
                    <input type="number" />
                </div>
            </div>
            <div>
                <div>
                    <label>Hit Dice:</label>
                    <input type="text" />
                </div>
                <div>
                    <label>Death Saves:</label>
                    <input type="text" />
                </div>
            </div>
            <div>
                <div>
                    <label>Personality Traits:</label>
                    <textarea />
                </div>
                <div>
                    <label>Ideals:</label>
                    <textarea />
                </div>
                <div>
                    <label>Bonds:</label>
                    <textarea />
                </div>
                <div>
                    <label>Flaws:</label>
                    <textarea />
                </div>
            </div>
            <div>
                <div>
                    <label>Features & Traits:</label>
                    <textarea />
                </div>
            </div>
            <div>
                <div>
                    <label>Equipment:</label>
                    <textarea />
                </div>
            </div>
            <div>
                <div>
                    <label>Spellcasting Ability:</label>
                    <input type="text" />
                </div>
                <div>
                    <label>Spell Save DC:</label>
                    <input type="number" />
                </div>
                <div>
                    <label>Spell Attack Bonus:</label>
                    <input type="number" />
                </div>
            </div>
            <div>
                <div>
                    <label>Spell Slots:</label>
                    <input type="text" />
                </div>
                <div>
                    <label>1st Level:</label>
                    <input type="text" />
                </div>
                <div>
                    <label>2nd Level:</label>
                    <input type="text" />
                </div>
                <div>
                    <label>3rd Level:</label>
                    <input type="text" />
                </div>
                <div>
                    <label>4th Level:</label>
                    <input type="text" />
                </div>
                <div>
                    <label>5th Level:</label>
                    <input type="text" />
                </div>
                <div>
                    <label>6th Level:</label>
                    <input type="text" />
                </div>
                <div>
                    <label>7th Level:</label>
                    <input type="text" />
                </div>
                <div>
                    <label>8th Level:</label>
                    <input type="text" />
                </div>
                <div>
                    <label>9th Level:</label>
                    <input type="text" />
                </div>
            </div>
            <SkillTable
                name="Skills"
                description="Please choose skills"
                tableData={tableData}
            />
        </div>

    );
};
const tableData = [
    {
      label: "Animal Handling(WIS)",
      score: 8,
      checked: false,
    },
    {
      label: "Arcana(INT)",
      score: 8,
      checked: false,
    },
    {
      label: "Athletics(STR)",
      score: 8,
      checked: false,
    },
    {
      label: "Deception(CHA)",
      score: 8,
      checked: false,
    },
    {
      label: "History(INT)",
      score: 8,
      checked: false,
    },
    {
      label: "Insight(WIS)",
      score: 8,
      checked: false,
    },
    {
      label: "Intimidation(CHA)",
      score: 8,
      checked: false,
    },
    {
      label: "Investigation(INT)",
      score: 8,
      checked: false,
    },
    {
      label: "Medicine(WIS)",
      score: 8,
      checked: true,
    },
    {
      label: "Nature(INT)",
      score: 8,
      checked: false,
    },
    {
      label: "Perception(WIS)",
      score: 8,
      checked: false,
    },
    {
      label: "Performance(CHA)",
      score: 8,
      checked: false,
    },
    {
      label: "Persuasion(CHA)",
      score: 8,
      checked: false,
    },
    {
      label: "Religion(INT)",
      score: 8,
      checked: false,
    },
    {
      label: "Sleight of Hand(DEX)",
      score: 8,
      checked: false,
    },
    {
      label: "Stealth(DEX)",
      score: 8,
      checked: true,
    },
    {
      label: "Survival(WIS)",
      score: 8,
      checked: false,
    },
  ];
export default CharacterSheet;
