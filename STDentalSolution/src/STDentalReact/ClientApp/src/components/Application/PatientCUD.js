import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import { green, yellow } from '@material-ui/core/colors';
import { Component } from 'react';
import { Table } from 'reactstrap';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import { FormGroup } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import * as moment  from 'moment';
import DatePicker from './Picker.component';
import SaveIcon from '@material-ui/icons/Save';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default class PatientCUD extends Component {
  
  constructor(props){
    super(props);

    this.state = {
    open: false,
    selectedName: null,
    selectedCity: null,
    selectedStreet: null,
    selectedPhone: null,
    selectedEmail: null,
    selectedDateBorn: null,
    selectedNationality: null,
    selectedDescription: null
  }
}

onDateBornSelect = value => {
  let res = moment(value).format('YYYY-MM-DD')
  this.setState({ selectedBornDate: res })
}

onFioInput(event) {
  this.setState({ selectedName: event.target.value && event.target.value })
}

onCityInput(event) {
  this.setState({ selectedCity: event.target.value && event.target.value })
}

onStreetInput(event) {
  this.setState({ selectedStreet: event.target.value && event.target.value })
}

onPhoneInput(event) {
  this.setState({ selectedPhone: event.target.value && event.target.value })
}

onEmailInput(event) {
  this.setState({ selectedEmail: event.target.value && event.target.value })
}

onDescriptionInput(event) {
  this.setState({ selectedDescription: event.target.value && event.target.value })
}

onNationalityInput(value) {
  this.setState({ selectedNationality: value && value })
}

onSaveTalon() {   
        
  //check doctor, patient, tablesservices

  let newPatient = {
      /*createdate: this.state.selectedTalonDate,
      summa: this.state.selectedCost,
      sale: 0,
      summasales: 0,
      cost: this.state.selectedCost,
      paymentstatus: 1,
      description: this.state.descriptionTalon*/
  }
  
  let newjson = JSON.stringify(newPatient, null, '\t')

  try{
      //this.addPatient(newjson);

  }
  catch {
      alert("Не удалось добавить пациента. Попытайтесь повторить операцию.");
  }
}

  render() {
    return (
      <div>
          <Button
              //variant="contained"
              variant="outlined"
              color="secondary"
              size="medium"
              style={{ top: "10px", justifyContent: "flex-end" }}
              //className={classes.button}
              startIcon={<PersonAddOutlinedIcon />}
              //height="15px" 
              onClick={() => (this.setState({ open: true }))}>
          Добавить пациента</Button>        
        <Dialog onClose={() => this.setState({ open: false })} aria-labelledby="customized-dialog-title" open={this.state.open}>
          <DialogTitle id="customized-dialog-title" 
            onClose={() => this.setState({ open: false })} 
            style={{ fontSize: "5px" }}
            maxWidth="true">
              Добавление пациента
          </DialogTitle>
          <DialogContent dividers>
            <FormGroup>
              <div>
                <TextField id="outlined-basic" label="Введите ФИО пациента" variant="outlined" 
                    style={{ width: "500px", marginBottom: "20px" }}
                    onChange={(event) => this.onFioInput(event)}/>
              </div>
              <div>
                <TextField id="outlined-basic" label="Введите город проживания" variant="outlined" 
                    style={{ width: "500px", marginBottom: "20px" }}
                    onChange={(event) => this.onCityInput(event)}/>
              </div>
              <div>
                <TextField id="outlined-basic" label="Введите адрес проживания" variant="outlined" 
                    style={{ width: "500px", marginBottom: "20px" }}
                    onChange={(event) => this.onStreetInput(event)}/>
              </div>
              <div>
                <TextField id="outlined-basic" label="Введите контактный телефон" variant="outlined" 
                    style={{ width: "500px", marginBottom: "20px" }}
                    onChange={(event) => this.onPhoneInput(event)}/>
              </div>
              <div>
                <TextField id="outlined-basic" label="Введите адрес электронной почты" variant="outlined" 
                    style={{ width: "500px", marginBottom: "20px" }}
                    onChange={(event) => this.onEmailInput(event)}/>
              </div>
              <div>
                <DatePicker labelvalue={"Введите дату рождения"} onSelected={ (value) => this.onDateBornSelect(value) } />
              </div>
              <div style={{ height: "20px" }}>                
              </div>
              <div>
              <FormLabel component="legend">Национальность</FormLabel>
              <RadioGroup aria-label="gender" name="gender1" onChange={(value) => this.onNationalityInput(value)}>
                <FormControlLabel value="1" control={<Radio style={{ color: "green" }} />} label="Республика Беларусь" />
                <FormControlLabel value="0" control={<Radio style={{ color: "green" }} />} label="Иностранное государство" />
              </RadioGroup>
              </div>
              <div>
                <TextField id="outlined-basic" label="Введите комментарий" variant="outlined" 
                    style={{ width: "500px", marginBottom: "20px" }}
                    onChange={(event) => this.onDescriptionInput(event)}/>
              </div>
            </FormGroup>

          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              //className={classes.button}
              startIcon={<SaveIcon />}
              //style={{ background: "yellow" }}
              onClick={() => this.onSavePatient()}
              >Сохранить
            </Button>

            <Button
              variant="outlined"
              color="primary"
              endIcon={<HomeOutlinedIcon />}
              onClick={() => this.setState({ open: false })}
              >Закрыть
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  /*async populateTalonServices(talonId) {  
    console.log(`populateTalonServices`);      
    const response = await fetch(`talons/services?talonid=${talonId}`);
    const data = await response.json();   
    this.setState({ services: data });
}*/
}
