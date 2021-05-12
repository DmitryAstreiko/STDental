import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ComboBoxM(props) {
  //const [value, setValue] = useState('');
  /*const [inputValue, setInputValue] = useState('');

  const handleClick = () => {
    setValue(props.fios[0]);
    setInputValue(props.fios[0]);
 };*/
 

  return (
    <div>
      {/*<div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
      <div>{`inputValue: '${inputValue}'`}</div>
  <br />*/}
    <Autocomplete
    //onChange={(event, value) => props.patientid = value.id}
    onChange={(event, value) => props.onSelected(value)}

        /*value={value}
        onChange={(event, value) => {
          setValue(value.id);
        }}

        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}*/


      id="combo-box"
      options={props.fios}
      getOptionLabel={(option) => option.name}
      style={{ width: 300 }}
      //getOptionSelected={(option, value) => {return option.id === value.id}}
      renderInput={(params) => <TextField {...params} label={props.labelvalue} variant="outlined" />}
      /*variant="outlined"*/
    />
    </div>
  );
}
