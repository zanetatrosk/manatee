import React, { Dispatch, SetStateAction } from "react";
import { Autocomplete, TextField, Chip } from "@mui/material";
import { AutocompleteItem } from "@pages/CreateCharacter/definitions/characterForm";
//interface used for props
//is it posible to replace this with sth like Object?
interface PropsParams {
  values: AutocompleteItem[];
  results: AutocompleteItem[];
  onChange: (value: AutocompleteItem[]) => void;
  label: string;
  helpText?: string;
  placeholder?: string;
  maxItems: number;
}

export default function MultiComplete(props: PropsParams) {

  const [item, setItem] = React.useState("");

  return (
    <div>
      <Autocomplete
        multiple
        value={props.results}
        defaultValue={props.results}
        freeSolo
        options={props.values}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.title
        }
        getOptionDisabled={() => props.results.length === props.maxItems}
        inputValue={item}
        onInputChange={(_, v) => setItem(v)}
        onBlur={() => {
          if (item.trim() === "" || props.results.length === props.maxItems){
            setItem("");
            return;
          }
          const tmp: AutocompleteItem[] = [
            ...props.results,
            { id: null, title: item },
          ];
          props.onChange(tmp);
        }}
        onChange={(e, value) => {
          setItem("");
          if(typeof value === "string") return;
          // @ts-ignore        
          props.onChange(value);
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
