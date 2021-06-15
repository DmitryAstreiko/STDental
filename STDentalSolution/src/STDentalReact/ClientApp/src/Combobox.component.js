import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ComboBox(props) {
  return (
    <div>
        <Autocomplete
          //onChange={(event, value) => props.patientid = value.id}
          onChange={(value) => { console.log(`value Autocomplete = ${value.id}`); props.onSelected(value); }}
          //clearOnBlur={true}
          //selectOnFocus={true}
          ////clearOnEscape={true}
          //disableCloseOnSelectid={props.nameid}
          options={props.lists}
          getOptionLabel={option => option.name ? option.name : ""}
          style={{ width: props.widthValue }}          
          getOptionSelected={(option, value) => { console.log(`getOptionSelected = ${value[0]}`) }}
          value={props.selectedValue}
          //inputValue={props.selectedValue}
          renderInput={(params) => <TextField {...params} label={props.labelvalue} variant="outlined" />}
          />


          {/*onChange={(value) => { console.log(`value = ${value}`); props.onSelected(value); }}
          ////clearOnBlur={true}
          ////clearOnEscape={true}
          //disableCloseOnSelectid={props.nameid}
          options={props.lists}
          getOptionLabel={(option) => option.name}
          style={{ width: props.widthValue }}          
          getOptionSelected={(option, value) => {return option.id === value.id}}
          value={props.selectedValue}
          //inputValue={props.selectedLabel}
          renderInput={(params) => <TextField {...params} label={props.labelvalue} variant="outlined" />}/*}
        />

        
        {/*<Autocomplete
          onChange={(event, value) => { props.onSelected(value) }}
          options={props.lists}
          getOptionLabel={(option) => option.name}
          style={{ width: props.widthValue }}
          renderInput={(params) => <TextField {...params} label={props.labelvalue} variant="outlined" />}
        />*/}
    </div>
  );
}
