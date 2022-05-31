import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ComboBox(props) {
  return (
    <div>
        <Autocomplete
          onChange={( event, value, reason ) => { 
            if (reason === "select-option") props.onSelected(value) }}
          options={props.lists}
          noOptionsText='Нет данных для отображения'
          getOptionLabel={option => option.name ? option.name : ""}
          style={{ width: props.widthValue }}          
          getOptionSelected={(option, value) => (option.id === value.id)}          
          value={props.selectedValue}
          renderInput={(params) => <TextField {...params} 
                                    label={props.labelvalue} 
                                    variant="outlined" 
                                    error={props.errorTrue ? props.errorTrue : false}/>}
          />
    </div>
  );
}
