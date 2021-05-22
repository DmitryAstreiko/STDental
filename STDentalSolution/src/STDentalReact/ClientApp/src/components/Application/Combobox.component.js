import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ComboBox(props) {
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
      onChange={(event, value) => { props.onSelected(value) }}

      id={props.nameid}
      options={props.lists}
      getOptionLabel={(option) => option.name}
      style={{ width: props.widthValue }}
      //getOptionSelected={(option, value) => {return option.id === value.id}}
      renderInput={(params) => <TextField {...params} label={props.labelvalue} variant="outlined" />}
    />
    </div>
  );
}
