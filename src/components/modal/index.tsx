import { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  LinearProgress,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ReactDatePicker from "react-datepicker";
import {
  pickerToYYYYMMDD,
  pickerToYYYYMMFirst,
  pickerToYYYYMMLast,
} from "./dates";
import { set } from "date-fns";
import { DICTIONARY_KEY_TYPES, twoDigitMonths } from "./utils";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import isEqual from "lodash/isEqual";
import { OptionLabelT, buildDynamicLabel } from "./multipleFilter";
import DatePickerWrapper from "../react-datepicker";
import { Input, ModalHeader } from "reactstrap";

export interface ModalPropsI {
  title: string;
  isOpen: boolean;
  isEditing: boolean;
  isNew?: boolean;
  disableDelete?: boolean;
  item: any;
  keys: any;
  saveChanges:
    | ((
        data: any,
        isEditing: boolean,
        isDelete?: boolean,
        isNew?: boolean
      ) => Promise<void>)
    | null;
  closeModal?: (() => void) | null;
}
export const emptyModalObject: ModalPropsI = {
  title: "",
  isOpen: false,
  isEditing: false,
  isNew: false,
  disableDelete: false,
  item: null,
  keys: null,
  saveChanges: null,
  closeModal: null,
};

export const Modal = ({
  title,
  isOpen,
  isEditing,
  isNew,
  disableDelete = false,
  item: propsItem,
  saveChanges,
  keys,
  closeModal,
}: ModalPropsI) => {
  // Theme
  const theme = useTheme();
  //  States
  const [updatedItem, setUpdatedItem] = useState<any>(
    keys.files ? { ...propsItem, actions: [] } : { ...propsItem }
  );
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNumberChange = (value: any, property: string) => {
    if (value === undefined || value === "") {
      value = null;
    } else {
      value = Number(value);
    }

    if (!isEqual(updatedItem[property], value)) {
      setUpdatedItem((prevState: any) => ({
        ...prevState,
        [property]: value,
      }));
    }
  };

  // Change handlers on inputs
  const handleSimpleChange = (value: any, property: string) => {
    if (value === undefined) value = null;
    if (!isEqual(updatedItem[property], value)) {
      setUpdatedItem((prevState: any) => ({
        ...prevState,
        [property]: value,
      }));
    }
  };

  const handleSelectWithSonChange = (
    property: string,
    value: any,
    sonProperty: string,
    sonValue: any
  ) => {
    if (value === undefined) value = null;
    if (sonValue === undefined) sonValue = null;
    setUpdatedItem((prevState: any) => ({
      ...prevState,
      [property]: value,
      [sonProperty]: sonValue,
    }));
  };

  const handleTimePickerChange = (time: Date, property: string) => {
    const hours = twoDigitMonths(time.getHours());
    const minutes = twoDigitMonths(time.getMinutes());
    const selectedTime = `${hours}:${minutes}:00`;
    setUpdatedItem((prevState: any) => ({
      ...prevState,
      [property]: selectedTime,
    }));
  };

  const handleMultiSelectChange = (values: any, property: string) => {
    const onlyIdValues = values?.map((value: any) => value.id);
    setUpdatedItem((prevState: any) => ({
      ...prevState,
      [property]: onlyIdValues,
    }));
  };

  const handleSelectMultiSelectNoIdChange = (values: any, property: string) => {
    setUpdatedItem((prevState: any) => ({
      ...prevState,
      [property]: values,
    }));
  };

  const handleSelectMultiSelectChange = (values: any, property: string) => {
    const onlyIdValues = Array.isArray(values)
      ? values?.map((value: any) => value.id)
      : [values.id];

    setUpdatedItem((prevState: any) => ({
      ...prevState,
      [property]: onlyIdValues,
    }));
  };

  const handleFilesChange = (change: any) => {
    if (Array.isArray(updatedItem.actions)) {
      const index = updatedItem.actions.findIndex(
        (x: any) => x.Key === change.Key
      );
      if (index !== -1) {
        updatedItem.actions.splice(index, 1); // Elimina el elemento existente con la misma key
      } else {
        updatedItem.actions.push(change);
      } // Agrega el nuevo cambio
    } else {
      updatedItem.actions = [change];
    }
  };

  // Functions to handle the modal
  const openConfirmDeleteDialog = () => setConfirmDeleteOpen(true);
  const closeConfirmDeleteDialog = () => setConfirmDeleteOpen(false);

  const handleSaveChanges = () => {
    setIsLoading(true);
    saveChanges && saveChanges(updatedItem, isEditing, false, isNew);
  };

  const confirmDelete = () => {
    if (keys.files) {
      for (const file of keys.files) {
        updatedItem.actions.push({ path: file.path });
      }
    }
    setIsLoading(true);
    saveChanges && saveChanges(updatedItem, isEditing, true);
    setConfirmDeleteOpen(false);
  };

  const validateForm = (propsItem: any, updatedItem: any) => {
    let formValidated = false;
    if (isEqual(propsItem, updatedItem)) {
      return true;
    }

    Object?.keys(updatedItem)?.map(property => {
      const item = keys[property];

      if (item?.required != null && item?.required && !updatedItem[property]) {
        formValidated = true;
      }
    });

    return formValidated;
  };

  return (
    <>
      <Dialog open={isOpen} PaperProps={{ style: { width: "100%" } }}>
        {isLoading && <LinearProgress color="primary" />}

        <ModalHeader toggle={closeModal} className="p-3 bg-primary-subtle">
          {`${title}`}
        </ModalHeader>
        <DialogContent sx={{ marginBottom: theme.spacing(5) }}>
          <FormControl fullWidth>
            {Object?.keys(propsItem)?.map(property => {
              const item = keys[property];

              // All RETURN NULL CONDITIONS
              if (!item || item?.isRendering === false) return null;
              if (item?.conditionalRender) {
                for (
                  let i = 0;
                  i < item?.conditionalRender.conditions.length;
                  i++
                ) {
                  const {
                    render,
                    constantKeyValue,
                    constantKey,
                    isKeyValueAnArray,
                  } = item.conditionalRender.conditions[i];
                  if (render) {
                    if (isKeyValueAnArray) {
                      if (
                        !constantKeyValue!.includes(updatedItem[constantKey])
                      ) {
                        if (
                          !isEqual(
                            updatedItem[property],
                            item?.conditionalRender.resetValue
                          )
                        ) {
                          handleSimpleChange(
                            item?.conditionalRender.resetValue,
                            property
                          );
                        }

                        return null;
                      }
                    } else {
                      if (
                        !isEqual(updatedItem[constantKey], constantKeyValue)
                      ) {
                        if (
                          !isEqual(
                            updatedItem[property],
                            item?.conditionalRender.resetValue
                          )
                        ) {
                          handleSimpleChange(
                            item?.conditionalRender.resetValue,
                            property
                          );
                        }

                        return null;
                      }
                    }
                  } else {
                    if (isKeyValueAnArray) {
                      if (
                        constantKeyValue!.includes(updatedItem[constantKey])
                      ) {
                        if (
                          !isEqual(
                            updatedItem[property],
                            item?.conditionalRender.resetValue
                          )
                        ) {
                          handleSimpleChange(
                            item?.conditionalRender.resetValue,
                            property
                          );
                        }

                        return null;
                      }
                    } else {
                      if (isEqual(updatedItem[constantKey], constantKeyValue)) {
                        if (
                          !isEqual(
                            updatedItem[property],
                            item?.conditionalRender.resetValue
                          )
                        ) {
                          handleSimpleChange(
                            item?.conditionalRender.resetValue,
                            property
                          );
                        }

                        return null;
                      }
                    }
                  }
                }
              }

              let jsx: JSX.Element | undefined;
              let filteredArray;

              const optionRendered = (option: any): string => {
                if (
                  "dynamicOptionLabel" in item &&
                  item.dynamicOptionLabel !== undefined
                ) {
                  const { dynamicOptionLabel } = item;

                  return buildDynamicLabel(option, dynamicOptionLabel);
                } else {
                  return option?.name;
                }
              };

              if (item.filterArrayKey) {
                filteredArray = item?.array.filter(
                  (arrayIndex: any) =>
                    arrayIndex[item.filterArrayKey] ===
                    updatedItem[item.filterArrayKey]
                );
              } else {
                filteredArray = item.array;
              }

              // HERE IS GOING TO RENDER ALL THE PROPS THAT COME IN THE OBJECT
              if (item.type === DICTIONARY_KEY_TYPES.TEXT) {
                const value = updatedItem[property];

                jsx = (
                  <>
                    <TextField
                      fullWidth
                      label={item.label}
                      value={value}
                      onChange={e =>
                        handleSimpleChange(e.target.value, property)
                      }
                      autoFocus
                    />
                    {/* <div className="mb-4">
                      <label htmlFor="position-input" className="form-label">
                        {item.label}
                      </label>
                      <Input
                        type="text"
                        className="form-control"
                        id="icon-input"
                        placeholder={`Enter ${item.label}`}
                        name="iconName"
                        validate={{
                          required: { value: true },
                        }}
                        onChange={e =>
                          handleSimpleChange(e.target.value, property)
                        }
                        value={value}
                      />
                    </div> */}
                  </>
                );
              } else if (item.type === DICTIONARY_KEY_TYPES.NUMBER) {
                jsx = (
                  <TextField
                    fullWidth
                    label={item.label}
                    value={updatedItem[property]}
                    onChange={e => handleNumberChange(e.target.value, property)}
                    type="number"
                  />
                );
              } else if (item.type === DICTIONARY_KEY_TYPES.CHECKBOX) {
                jsx = (
                  <FormControlLabel
                    label={item.label}
                    control={
                      <Checkbox
                        checked={updatedItem[property]}
                        onChange={e =>
                          handleSimpleChange(e.target.checked, property)
                        }
                        name={item.label}
                      />
                    }
                  />
                );
              } else if (item.type === DICTIONARY_KEY_TYPES.DATE) {
                jsx = (
                  <DatePicker
                    sx={{ width: "100%" }}
                    label={item.label}
                    value={dayjs(updatedItem[property])}
                    slotProps={{
                      textField: {
                        required: item.required,
                      },
                    }}
                    onChange={(value: any) =>
                      handleSimpleChange(pickerToYYYYMMDD(value), property)
                    }
                  />
                );
              } else if (
                item.type === DICTIONARY_KEY_TYPES.MONTHLY_FIRST_DAY_DATE
              ) {
                jsx = (
                  <DatePicker
                    sx={{ width: "100%" }}
                    label={item.label}
                    views={["month", "year"]}
                    value={dayjs(updatedItem[property])}
                    onChange={(value: any) =>
                      handleSimpleChange(pickerToYYYYMMFirst(value), property)
                    }
                  />
                );
              } else if (
                item.type === DICTIONARY_KEY_TYPES.MONTHLY_LAST_DAY_DATE
              ) {
                jsx = (
                  <DatePicker
                    sx={{ width: "100%" }}
                    label={item.label}
                    views={["month", "year"]}
                    value={dayjs(updatedItem[property])}
                    onChange={(value: any) =>
                      handleSimpleChange(pickerToYYYYMMLast(value), property)
                    }
                  />
                );
              } else if (item.type === DICTIONARY_KEY_TYPES.HOURLY_DATE) {
                const timeParts = updatedItem[property]
                  ?.toString()
                  .split(":") || ["00", "00", "00"];
                const currentDate = new Date();
                const parsedTime = set(currentDate, {
                  hours: parseInt(timeParts[0]),
                  minutes: parseInt(timeParts[1]),
                  seconds: parseInt(timeParts[2]),
                });
                jsx = (
                  <DatePickerWrapper>
                    <ReactDatePicker
                      dateFormat="HH:mm"
                      onChange={(time: Date) =>
                        handleTimePickerChange(time, property)
                      }
                      selected={parsedTime}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={5}
                      customInput={<TextField label={item.label} fullWidth />}
                    />
                  </DatePickerWrapper>
                );
              } else if (item.type === DICTIONARY_KEY_TYPES.SELECT) {
                const value = filteredArray?.find(
                  ({ id }: { id: number }) => id === updatedItem[property]
                );
                let onChange: any;

                if (
                  item.changeAnotherKey &&
                  item?.changeAnotherKey?.constantKey
                ) {
                  const { constantKey, value: changeValue } =
                    item.changeAnotherKey;
                  onChange = (onChangeValue: any) =>
                    handleSelectWithSonChange(
                      property,
                      onChangeValue?.id,
                      constantKey,
                      changeValue
                    );
                } else {
                  onChange = (onChangeValue: any) =>
                    handleSimpleChange(onChangeValue?.id, property);
                }

                jsx = (
                  <>
                    <Autocomplete
                      sx={{ width: "100%" }}
                      options={filteredArray}
                      getOptionLabel={(option: any) => optionRendered(option)}
                      value={value || null}
                      renderInput={params => (
                        <TextField {...params} label={item.label} />
                      )}
                      onChange={(e, onChangeValue) => onChange(onChangeValue)}
                    />
                  </>
                );
              } else if (
                item.type === DICTIONARY_KEY_TYPES.SELECT_CONVERT_MULTISELECT
              ) {
                const { propKey, constantKey, switcherValue } = item.convert;
                const isSwitcherValue =
                  updatedItem[constantKey] === switcherValue;
                const array = filteredArray?.filter(
                  (element: any) =>
                    element[propKey] === updatedItem[constantKey]
                );
                const existingItems = isSwitcherValue
                  ? array?.filter((element: any) =>
                      updatedItem[property]?.find(
                        (updated_item: any) => updated_item === element?.id
                      )
                    )
                  : array?.find(
                      (element: any) => element.id === updatedItem[property][0]
                    );

                jsx = (
                  <Autocomplete
                    multiple={isSwitcherValue}
                    sx={{ width: "100%" }}
                    options={array || []}
                    getOptionLabel={(option: any) => optionRendered(option)}
                    value={
                      updatedItem[property].length > 0
                        ? existingItems
                        : isSwitcherValue
                          ? []
                          : null
                    }
                    renderInput={params => (
                      <TextField {...params} label={item.label} />
                    )}
                    onChange={(e, values) =>
                      handleSelectMultiSelectChange(values, property)
                    }
                    disableClearable
                  />
                );
              } else if (item.type === DICTIONARY_KEY_TYPES.MULTISELECT) {
                const existingItems = filteredArray?.filter((element: any) =>
                  updatedItem[property]?.find(
                    (updated_item: any) => updated_item === element?.id
                  )
                );

                jsx = (
                  <Autocomplete
                    multiple
                    sx={{ width: "100%" }}
                    options={filteredArray || []}
                    getOptionLabel={(option: any) => optionRendered(option)}
                    value={existingItems}
                    renderInput={params => (
                      <TextField {...params} label={item.label} />
                    )}
                    onChange={(e, values) =>
                      handleMultiSelectChange(values, property)
                    }
                    disableClearable
                  />
                );
              } else if (item.type === DICTIONARY_KEY_TYPES.MULTISELECTNOID) {
                const existingItems = filteredArray?.filter((element: any) =>
                  updatedItem[property]?.find(
                    (updated_item: any) => updated_item.id === element?.id
                  )
                );

                jsx = (
                  <Autocomplete
                    multiple
                    sx={{ width: "100%" }}
                    options={filteredArray || []}
                    getOptionLabel={(option: any) => optionRendered(option)}
                    value={existingItems}
                    renderInput={params => (
                      <TextField {...params} label={item.label} />
                    )}
                    onChange={(e, values) =>
                      handleSelectMultiSelectNoIdChange(values, property)
                    }
                    disableClearable
                  />
                );
              }

              return (
                <Box key={property} sx={{ marginTop: theme.spacing(5) }}>
                  {jsx}
                </Box>
              );
            })}
          </FormControl>
        </DialogContent>
        <DialogActions>
          {isEditing && !disableDelete && (
            <Button onClick={openConfirmDeleteDialog}>Eliminar</Button>
          )}
          {/* <Button onClick={closeModal ? closeModal : undefined}>
            Cancelar
          </Button> */}
          <Button
            disabled={validateForm(propsItem, updatedItem)}
            variant={isEqual(propsItem, updatedItem) ? "outlined" : "contained"}
            onClick={handleSaveChanges}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmDeleteOpen} onClose={closeConfirmDeleteDialog}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <p>¿Estás seguro de que deseas eliminar este elemento?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmDeleteDialog}>Cancelar</Button>
          <Button variant="contained" onClick={confirmDelete}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
