import React from "react";
import { useState, useEffect } from "react";
import { Autocomplete, TextField, Chip } from "@mui/material";

//interface used for autocomplete
interface AutocompleteItem {
  id: number;
  title: string;
}
const languages: AutocompleteItem[] = [
  // Elvish languages
  { id: generateId(), title: "Common Elvish" },
  { id: generateId(), title: "High Elvish" },
  { id: generateId(), title: "Wood Elvish" },
  { id: generateId(), title: "Drow Sign Language" },

  // Dwarvish languages
  { id: generateId(), title: "Common Dwarvish" },
  { id: generateId(), title: "Hill Dwarvish" },
  { id: generateId(), title: "Mountain Dwarvish" },

  // Draconic languages
  { id: generateId(), title: "Common Draconic" },
  { id: generateId(), title: "High Draconic" },
  { id: generateId(), title: "Ancient Draconic" },

  // Gnomish languages
  { id: generateId(), title: "Common Gnomish" },
  { id: generateId(), title: "Rock Gnomish" },
  { id: generateId(), title: "Forest Gnomish" },

  // Orcish languages
  { id: generateId(), title: "Common Orcish" },
  { id: generateId(), title: "Black Orcish" },
  { id: generateId(), title: "Gray Orcish" },

  // Celestial languages
  { id: generateId(), title: "Common Celestial" },
  { id: generateId(), title: "High Celestial" },

  // Infernal languages
  { id: generateId(), title: "Common Infernal" },
  { id: generateId(), title: "High Infernal" },

  // Abyssal languages
  { id: generateId(), title: "Common Abyssal" },
  { id: generateId(), title: "High Abyssal" },

  // Giant languages
  { id: generateId(), title: "Common Giant" },
  { id: generateId(), title: "Hill Giant" },
  { id: generateId(), title: "Stone Giant" },

  // Undercommon languages
  { id: generateId(), title: "Common Undercommon" },
  { id: generateId(), title: "High Undercommon" },
];
function generateId(): number {
  return Math.random();
}
//interface used for props
interface parameters {
  values: string[];
  defaultValue?: string[];
  label: string,
  helpText?: string,

}

export default function MultiComplete() {
  //selected will be filled with defaultValue?
  const [selected, setSelected] = useState<AutocompleteItem[]>([languages[5]]);
  const [item, setItem] = React.useState("");
  const updateSelected = (newArr: AutocompleteItem[]) => {
    setSelected(newArr); // This should update the state with the new value
  };
  useEffect(() => {
    console.log("Selected after update:", selected);
    setItem("");
  }, [selected]);

  return (
    <div>
      <Autocomplete
        multiple
        value={selected}
        freeSolo
        options={languages}
        getOptionLabel={(option) => typeof option === "string" ? option : option.title}
        inputValue={item}
        onInputChange={(_, v) => setItem(v)}
        onBlur={() => {
          if (item === "") return;
          const tmp: AutocompleteItem[] = [
            ...selected,
            { id: generateId(), title: item },
          ];
          updateSelected(tmp);
        }}
        onChange={(e, value: (AutocompleteItem | string) []) => {
          //this is so ugly, I do not know how to do it better
          console.log(value, 'result', typeof value.at(0) === 'string');
          if( value.length !== 0 && typeof value.at(0) === 'string') return;
          //@ts-ignore
          updateSelected(value);
        }}
        renderTags={(value: readonly AutocompleteItem[], getTagProps) =>
          value.map((option: AutocompleteItem, index: number) => (
            <Chip
              variant="outlined"
              label={option.title}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="Languages"
            helperText="Choose 3 languages"
            placeholder="Elfistina"
          />
        )}
      />
    </div>
  );
}
