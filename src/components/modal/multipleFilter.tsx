import { Autocomplete, Checkbox, SxProps, TextField } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export const buildDynamicLabel = (option: any, item: OptionLabelT) => {
  const {
    propsToGet,
    propsJoiner,
    labelStart = "",
    transform,
    labelEnd = "",
    labelEndOnlyWithProperty,
  } = item;

  if (transform) {
    return (
      transform.func(option[transform.prop]) +
      transform.joiner +
      transform.addedLabel
    );
  } else {
    const dynamicLabel = propsToGet!.map((itemProps: any) => {
      return itemProps.reduce((accumulator: any, prop: any) => {
        if (Object.prototype.hasOwnProperty.call(accumulator, prop)) {
          return accumulator[prop];
        }

        return "";
      }, option);
    });

    const labelWithJoiner = dynamicLabel
      .filter((x: any) => x !== "")
      .join(`${propsJoiner}`);

    const checkedLabelEnd = option[labelEndOnlyWithProperty as string]
      ? labelEnd
      : "";

    return labelStart + labelWithJoiner + checkedLabelEnd;
  }
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export type OptionLabelT = {
  transform?: any;
  propsToGet?: Array<Array<string>>;
  propsJoiner?: string;
  labelStart?: string;
  labelEnd?: string;
  labelEndOnlyWithProperty?: string;
};

interface FilterComponentI {
  multiple?: boolean;
  disableClearable?: boolean;
  label: string;
  value: any;
  showInsideOptions?: boolean;
  options: Array<any>;
  onChange: any;
  setOptionLabel?: OptionLabelT;
  sx?: SxProps;
}

// By default the label is the "name" prop.

const FilterComponent = ({
  multiple = true,
  disableClearable = false,
  label,
  value,
  options,
  onChange,
  setOptionLabel = undefined,
  sx,
  showInsideOptions = false,
}: FilterComponentI) => {
  return (
    <Autocomplete
      multiple={multiple}
      value={value}
      options={options}
      sx={sx}
      disableCloseOnSelect
      getOptionLabel={(option: any) =>
        setOptionLabel ? buildDynamicLabel(option, setOptionLabel) : option.name
      }
      isOptionEqualToValue={({ id }: { id: number; name: string }, value) => {
        return id === value.id;
      }}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {setOptionLabel
            ? buildDynamicLabel(option, setOptionLabel)
            : option.name}
        </li>
      )}
      {...(showInsideOptions && { renderTags: () => null })}
      renderInput={params => <TextField {...params} label={label} />}
      onChange={(event, newValue) => onChange(newValue)}
      disableClearable={disableClearable}
    />
  );
};

export default FilterComponent;
