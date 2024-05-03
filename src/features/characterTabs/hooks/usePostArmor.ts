import { usePostArmorByCharacterIdMutation } from "api/charactersApiSlice";

const usePostArmor = () => {
    const [postArmorByCharacterId] = usePostArmorByCharacterIdMutation();
    const postArmor = (armor: string[], id: string) => {
        if (id) {
            postArmorByCharacterId({ id, armor: armor[0] });
        }
    }
    return postArmor;
};

export default usePostArmor;