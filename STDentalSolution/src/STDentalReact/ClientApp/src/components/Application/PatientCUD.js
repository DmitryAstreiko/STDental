import React from 'react';
import { ThemeProvider, withStyles } from '@material-ui/core/styles';
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
import { ApiClient } from './APIClient';

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
    selectedDateBorn: moment(new Date()).format('YYYY-MM-DD'),
    selectedNationality: "1",
    selectedDescription: null,
    errorFio: false,
    errorDateBorn: false,
    errorCity: false,
    errorStreet: false,
    errorPhone: false,
    errorEmail: false,
    errorDescription: false,
    errorNationality: false,
    canAdd: false
  }

  this.apiClient = new ApiClient();
}

onDateBornSelect = value => {
  this.setState({ selectedBornDate: moment(value).format('YYYY-MM-DD') })
}

onFioInput(event) {  
  this.setState({ selectedName: event.target.value, errorFio: !event.target.value})
}

onCityInput(event) {
  this.setState({ selectedCity: event.target.value, errorCity: !event.target.value })
}

onStreetInput(event) {
  this.setState({ selectedStreet: event.target.value, errorStreet: !event.target.value })
}

onPhoneInput(event) {
  this.setState({ selectedPhone: event.target.value, errorPhone: !event.target.value })
}

onEmailInput(event) {
  this.setState({ selectedEmail: event.target.value, errorEmail: !event.target.value })
}

onDescriptionInput(event) {
  this.setState({ selectedDescription: event.target.value, errorDescription: !event.target.value })
}

onNationalityInput(event) {
  this.setState({ selectedNationality: event.target.value, errorNationality: !event.target.value})
}

async onSavePatient() {   

//прогнать все statе, потом проверить статусы 


    console.log(`errorFio = ${this.state.errorFio}`);
   
      let newPatient = {
        name: this.state.selectedName,
        city: this.state.selectedCity,
        street: this.state.selectedStreet,
        phone: this.state.selectedPhone,
        email: this.state.selectedEmail,
        dateborn: this.state.selectedDateBorn,
        nationality: (this.state.selectedNationality === '1') ? 1 : 0,
        description: this.state.selectedDescription
      }
      
      let newjson = JSON.stringify(newPatient, null, '\t')

      try{
          const res = await this.addPatient(newjson);

          if(res === 200) {
            alert(`Пациент успешно добавлен!`);
            this.setState({ open: false });
            //() => props.recountPatient();
          }

          if(res === 400) alert("Пациент не добавлен в систему!");
      }
      catch {
          alert("Не удалось добавить пациента.");
      }  
}

  render() {
    //const { recountPatient } = this.props;

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
                <TextField id="outlined-basic-fio" label="Введите ФИО пациента" variant="outlined" 
                    style={{ width: "500px", marginBottom: "20px" }}
                    onChange={(event) => this.onFioInput(event)}
                    error={this.state.errorFio}/>
              </div>
              <div>
                <TextField id="outlined-basic-city" label="Введите город проживания" variant="outlined" 
                    style={{ width: "500px", marginBottom: "20px" }}
                    onChange={(event) => this.onCityInput(event)}
                    error={this.state.errorCity}/>
              </div>
              <div>
                <TextField id="outlined-basic-street" label="Введите адрес проживания" variant="outlined" 
                    style={{ width: "500px", marginBottom: "20px" }}
                    onChange={(event) => this.onStreetInput(event)}
                    error={this.state.errorStreet}/>
              </div>
              <div>
                <TextField id="outlined-basic-phone" label="Введите контактный телефон" variant="outlined" 
                    style={{ width: "500px", marginBottom: "20px" }}
                    onChange={(event) => this.onPhoneInput(event)}
                    error={this.state.errorPhone}/>
              </div>
              <div>
                <TextField id="outlined-basic-email" label="Введите адрес электронной почты" variant="outlined" 
                    style={{ width: "500px", marginBottom: "20px" }}
                    onChange={(event) => this.onEmailInput(event)}/>
              </div>
              <div>
                <DatePicker id="date-born" labelvalue={"Введите дату рождения"} 
                  onSelected={ (value) => this.onDateBornSelect(value) } 
                  error={this.state.errorDateBorn} />
              </div>
              <div style={{ height: "20px" }}>                
              </div>
              <div>
              <FormLabel component="legend">Национальность</FormLabel>
              <RadioGroup aria-label="gender" name="gender1" value={this.state.selectedNationality} 
                  onChange={(event) => this.onNationalityInput(event)} error={this.state.errorNationality}>
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
          
            <div className={"d-flex justify-content-around"} style={{ marginTop: "20px", marginBottom: "20px" }}>
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
            </div>
                  
        </Dialog>
      </div>
    )
  }

  async addPatient(jsonTalon) {     
    const res = await this.apiClient.addPatient(jsonTalon);    
    return res;
  }
}
