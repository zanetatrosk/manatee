import React, { Dispatch, SetStateAction } from "react";
import { Autocomplete, TextField, Chip } from "@mui/material";
import { AutocompleteItem } from "@pages/CreateCharacter/definitions/characterForm";
//interface used for props
interface PropsParams {
  values: AutocompleteItem[];
  results: AutocompleteItem[];
  onChange: (value: AutocompleteItem[]) => void;
  label: string;
  helpText?: string;
  placeholder?: string;
  maxItems: number;
  data_cy?: string;
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
        data-cy={props.data_cy}
        options={props.values}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.title
        }
        getOptionDisabled={() => props.results.length === props.maxItems}
        inputValue={item}
        onInputChange={(_, v) => setItem(v)}
        onBlur={() => {
          if (item.trim() === "" || props.results.length === props.maxItems || props.results.find((i) => i.title === item)){
            setItem("");
            return;
          }
          const tmp: AutocompleteItem[] = [
            { id: null, title: item },
            ...props.results,
          ];
          setItem("");
          props.onChange(tmp);
        }}
        onChange={(e, value) => {
          // @ts-ignore        
          props.onChange(value);
        }}
        renderTags={(value: readonly AutocompleteItem[], getTagProps) =>
          value.map((option: AutocompleteItem, index: number) => (
            <Chip
              variant="outlined"
              label={option.title}
              data-cy={"chip-" + index}
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
