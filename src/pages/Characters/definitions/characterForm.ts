interface Race {
    id: number;
    label: string | null;
    languages: number[];
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