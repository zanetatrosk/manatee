import { usePostWeaponsByCharacterIdMutation } from "api/charactersApiSlice";

const usePostAttacks = () => {
  const [postAttacksByCharacterId] = usePostWeaponsByCharacterIdMutation();

  const postAttacks = (weapons: string[], id: string) => {
    if (id) {
      postAttacksByCharacterId({ id, weapons });
    }
  };

  return postAttacks;
};

export default usePostAttacks;