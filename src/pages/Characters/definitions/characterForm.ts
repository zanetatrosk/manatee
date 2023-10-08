

interface Race {
    id: number;
    label: string | null;
    languages: number[];
    description?: string;
    speed?: number;
    features?: string[];
    //enum
    abilityScorePlus1?: string[];
    abilityScorePlus2?: string[];
    //enum
    sizeOptions?: string[];
}


interface Background {
    id: number;
    label: string;
    languages: number[];
    tools: number[];
}
//interface used for autocomplete
interface AutocompleteItem {
    id: number;
    title: string;
}

export type {Race, AutocompleteItem, Background}