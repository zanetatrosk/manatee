import React from "react";
import { useState, useEffect } from "react";
import { Autocomplete, TextField, Chip } from "@mui/material";
const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
  {
    label: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
];
//interface used for props
interface parameters {
  defaultValue?: string[];
}
export default function MultiComplete() {
  //selected will be filled with defaultValue?  
  const [selected, setSelected] = useState<string[]>([top100Films[5].label]);
  const [item, setItem] = React.useState("");
  const updateSelected = (newArr: string[]) => {
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
        onChange={(e, value: string[]) => {
          updateSelected([...value]);
        }}
        inputValue={item}
        onInputChange={(_, v) => setItem(v)}
        onBlur={() => {
          if (item === "") return;
          const tmp: string[] = [...selected, item];
          updateSelected(tmp);
        }}
        options={top100Films.map((option) => option.label)}
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="freeSolo"
            placeholder="Favorites"
          />
        )}
      />
    </div>
  );
}
