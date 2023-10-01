import React from "react";
import { useState, useEffect } from "react";
import { Autocomplete, TextField, Chip } from "@mui/material";

//interface used for props
//is it posible to replace this with sth like Object?
interface PropsParams {
  values: AutocompleteItem[];
  results: AutocompleteItem[];
  label: string;
  helpText?: string;
  placeholder?: string;
  maxItems: number;
}
//interface used for autocomplete
interface AutocompleteItem {
  id: number;
  title: string;
}
//this func will be in utils todo
function generateId(): number {
  return Math.random();
}
export default function MultiComplete(props: PropsParams) {
  //selected will be filled with defaultValue

  //this is working
  const [selected, setSelected] = useState<AutocompleteItem[]>(props.results);


  const [item, setItem] = React.useState("");
  const updateSelected = (newArr: AutocompleteItem[]) => {
    setSelected(newArr); // This should update the state with the new value
  };
  useEffect(() => {
    console.log("Selected after update:", selected, props.results);
    setItem("");
  }, [selected]);

  useEffect(() => {
    console.log("Selected after update:", selected, props.results);
    setSelected(props.results)
  }, [props.results]);

  return (
    <div>
      <Autocomplete
        multiple
        value={selected}
        defaultValue={selected}
        freeSolo
        options={props.values}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.title
        }
        getOptionDisabled={() => selected.length === props.maxItems}
        inputValue={item}
        onInputChange={(_, v) => setItem(v)}
        onBlur={() => {
          if (item.trim() === "") return;
          const tmp: AutocompleteItem[] = [
            ...selected,
            { id: generateId(), title: item },
          ];
          updateSelected(tmp);
        }}
        onChange={(e, value: (AutocompleteItem | string)[]) => {
          //this is so ugly, I do not know how to do it better
          if (value.length !== 0 && typeof value.at(0) === "string") return;
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
            label={props.label}
            helperText={props.helpText}
            placeholder={props.placeholder}
          />
        )}
      />
    </div>
  );
}
