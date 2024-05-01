import React from "react";
import { Autocomplete, TextField, Chip } from "@mui/material";
import { Sourceable } from "definitions/characterForm";

//interface used for props
interface PropsParams {
  values: Sourceable[];
  results: Sourceable[];
  onChange: (value: Sourceable[]) => void;
  label: string;
  helpText?: string;
  placeholder?: string;
  maxItems: number;
  data_cy?: string;
}

export default function MultiComplete(props: PropsParams) {
  const [item, setItem] = React.useState("");
  if (props.maxItems === 0) return null;
  return (
    <div>
      <Autocomplete
        multiple
        isOptionEqualToValue={(option, value) => option.id === value.id}
        value={props.results}
        data-cy={props.data_cy}
        options={props.values}
        getOptionLabel={(option) => option.name}
        getOptionDisabled={() => props.results.length === props.maxItems}
        inputValue={item}
        onInputChange={(_, v) => setItem(v)}
        onChange={(e, value) => {
          props.onChange(value);
        }}
        renderTags={(value: readonly Sourceable[], getTagProps) =>
          value.map((option: Sourceable, index: number) => (
            <Chip
              variant="outlined"
              label={option.name}
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
