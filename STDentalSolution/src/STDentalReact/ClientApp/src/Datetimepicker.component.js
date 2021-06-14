import React, { useState  } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 150,
  },
}));

export default function DatePickers(props) {
  const classes = useStyles();
  //const [selectedDate, handleDateChange] = useState(new Date());


  return (
    <form className={classes.container} noValidate>
      <TextField
        
        id="date"
        label={props.labelvalue}
        type="date"
        //defaultValue="2000-01-01"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
