import { usePostSpellsByCharacterIdMutation } from "api/charactersApiSlice";

const usePostSpells = () => {
    const [postSpellsByCharacterId] = usePostSpellsByCharacterIdMutation();
    const postSpells = (spells: string[], id: string) => {
        if (id) {
            postSpellsByCharacterId({ id, spells });
        }
    }
    return postSpells;
  };

export default usePostSpells;  