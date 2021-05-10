import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ComboBoxM(props) {
  return (
    <Autocomplete
      id="combo-box"
      options={props.fios}
      getOptionLabel={(option) => option.name}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={props.labelvalue} variant="outlined" />}
    />
  );
}
