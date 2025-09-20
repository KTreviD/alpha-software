import {
  Box,
  Divider,
  Autocomplete,
  TextField,
  Stack,
  Grid,
  IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";

type DynamicDeviceT = {
  device_api_id: string;
  device_type: string;
  id: number;
  brand: { id: number; name: string };
};

type CatalogGenericT = {
  id: number | string;
  name: string;
};

export default function DynamicDeviceFields(props: any) {
  const {
    data,
    brands,
    device_types,
    optionRendered,
    handleChange,
    handleDeleteInput,
    handleAddInput,
  } = props;
  useEffect(() => {
    handleAddInput();
  }, []);
  return (
    <>
      <Box>
        <Divider textAlign="left">Dispositivos</Divider>
        {data.map((item: any, index: number) => (
          <Box sx={{ flexGrow: 1, marginTop: "15px" }} key={`device_${index}`}>
            <Grid container spacing={2}>
              <Grid item xs={11}>
                <Stack spacing={2}>
                  <Box sx={{ marginTop: "10px" }}>
                    <Autocomplete
                      key={`deviceBrand-${index}`}
                      sx={{ width: "100%" }}
                      options={brands}
                      value={item ? item["brand"] : null}
                      isOptionEqualToValue={(
                        option: CatalogGenericT,
                        value: CatalogGenericT
                      ) => {
                        if (!value) return false;
                        if (option.id === "") return false;
                        if (option.id === '""') return false;
                        if (value.id === "") return false;
                        if (value.id === '""') return false;

                        return option.id === value.id;
                      }}
                      renderInput={params => (
                        <TextField {...params} label="Marca dispositivo" />
                      )}
                      onChange={(e, onChangeValue) =>
                        handleChange(onChangeValue, "brand", index)
                      }
                      getOptionLabel={(option: CatalogGenericT) =>
                        optionRendered(option)
                      }
                    />
                  </Box>
                  <Box sx={{ marginTop: "10px" }}>
                    <Autocomplete
                      key={`device_type-${index}`}
                      sx={{ width: "100%" }}
                      options={device_types}
                      value={item ? item["device_type"] : null}
                      isOptionEqualToValue={(option: string, value: string) =>
                        option === value
                      }
                      renderInput={params => (
                        <TextField {...params} label="Tipo dispositivo" />
                      )}
                      onChange={(e, onChangeValue) =>
                        handleChange(onChangeValue, "device_type", index)
                      }
                      getOptionLabel={(option: string) => option}
                    />
                  </Box>
                  <Box sx={{ marginTop: "10px" }}>
                    <TextField
                      key={`device_api-${index}`}
                      fullWidth
                      label="Dispositivo API Id"
                      value={
                        item &&
                        (item["device_api_id"] != undefined ||
                          item["device_api_id"] != null)
                          ? item["device_api_id"]
                          : ""
                      }
                      onChange={e =>
                        handleChange(e.target.value, "device_api_id", index)
                      }
                      autoFocus
                    />
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={1}>
                {data.length > 1 && index + 1 < data.length && (
                  <IconButton
                    color="primary"
                    onClick={() => handleDeleteInput(index)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
                {index === data.length - 1 && (
                  <IconButton
                    color="primary"
                    onClick={() => handleAddInput()}
                    aria-label="add"
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </>
  );
}
