import React from 'react';
//import { ThemeProvider, withStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
//import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
//import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
//import { green, yellow } from '@material-ui/core/colors';
import { Component } from 'react';
//import { Table } from 'reactstrap';
//import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import { FormGroup } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
//import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import * as moment  from 'moment';
import DatePicker from './Picker.component';
import SaveIcon from '@material-ui/icons/Save';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import { ApiClient } from './APIClient';
//import { validate } from '@material-ui/pickers';

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

/*const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);*/

export default class PatientCRUD extends Component {
  
  constructor(props){
    super(props);

    this.state = {
    //open: false,
    open: this.props.visibleModal,
    selectedName: '',
    selectedCity: '',
    selectedStreet: '',
    selectedPhone: '',
    selectedEmail: '',
    selectedId: null,
    selectedBornDate: moment(new Date()).format('YYYY-MM-DD'),
    selectedNationality: '1',
    selectedDescription: '',
    errorName: false,
    errorDateBorn: false,
    errorCity: false,
    errorStreet: false,
    errorPhone: false
  }

  this.apiClient = new ApiClient();
}

onDateBornSelect(value) {
  this.setState({ selectedBornDate: moment(value).format('YYYY-MM-DD') })
}

onFioInput(event) {  
  this.setState({ selectedName: event.target.value }, () => this.validateFio());
}

validateFio() {
  let isValid = !!this.state.selectedName;
  this.setState({errorName: !isValid});
  return isValid;
}

onCityInput(event) {
  this.setState({ selectedCity: event.target.value }, () => this.validateCity());
}

validateCity() {
  let isValid = !!this.state.selectedCity;
  this.setState({errorCity: !isValid});
  return isValid;
}

onStreetInput(event) {
  this.setState({ selectedStreet: event.target.value }, () => this.validateStreet());
}

validateStreet() {
  let isValid = !!this.state.selectedStreet;
  this.setState({errorStreet: !isValid});
  return isValid;
}

onPhoneInput(event) {
  this.setState({ selectedPhone: event.target.value }, () => this.validatePhone());
}

validatePhone() {
  let isValid = !!this.state.selectedPhone;
  this.setState({errorPhone: !isValid});
  return isValid;
}

onEmailInput(event) {
  this.setState({ selectedEmail: event.target.value })
}

onDescriptionInput(event) {
  this.setState({ selectedDescription: event.target.value})
}

componentDidMount(){
  if (!this.props.operationInsert) {
    (this.props.selectedPatientId) && this.fillFields(this.props.selectedPatientId);
  }
}

async onAddPatient(newjson) {   
  try{
      const res = await this.addPatient(newjson);

      if(res === 200) {
        alert(`Пациент успешно добавлен!`);
        this.onClose();
      }

      if(res === 400) alert("Пациент не добавлен в систему!");
  }
  catch {
      alert("Не удалось добавить пациента.");
  }
}

async onEditPatient(newjson) {
  try{
      const res = await this.editPatient(newjson);

      if(res === 200) {
        alert(`Пациент успешно обновлен!`);
        this.onClose();
      }

      if(res === 400) alert("Пациент не обновлен!");
  }
  catch {
      alert("Не удалось обновить реквизиты пациента.");
  }
}

async onDeletePatient(patientId) {
  try{
      const res = await this.deletePatient(patientId);

      if(res === 200) {
        alert(`Пациент успешно удален!`);
        this.onClose();
      }

      if(res === 400) alert("Пациент не удален!");
  }
  catch {
      alert("Не удалось удалить пациента.");
  }
}

onButtonSave() { 
  const flagFio = this.validateFio();
  const flagCity = this.validateCity();
  const flagStreet = this.validateStreet();
  const flagPhone = this.validatePhone();

  if (flagFio && flagCity && flagStreet && flagPhone)
  {       
    if (this.props.operationInsert) {
      let newPatient = {
        name: this.state.selectedName,
        city: this.state.selectedCity,
        street: this.state.selectedStreet,
        phone: this.state.selectedPhone,
        email: this.state.selectedEmail,
        dateborn: this.state.selectedBornDate,
        nationality: (this.state.selectedNationality === '1') ? 1 : 0,
        description: this.state.selectedDescription
      };

      const newjson = JSON.stringify(newPatient, null, '\t');

      this.onAddPatient(newjson);
    };

    if (this.props.operationEdit) {
      let newPatient = {
        patientId: this.state.selectedId,
        name: this.state.selectedName,
        city: this.state.selectedCity,
        street: this.state.selectedStreet,
        phone: this.state.selectedPhone,
        email: this.state.selectedEmail,
        dateborn: this.state.selectedBornDate,
        nationality: (this.state.selectedNationality === '1') ? 1 : 0,
        description: this.state.selectedDescription
      };

      const newjson = JSON.stringify(newPatient, null, '\t');

      this.onEditPatient(newjson);
    };

    this.props.operationDelete && this.onDeletePatient(this.props.selectedPatientId);
  }
}

onClose() {  
  this.props.changeState();
  this.props.selectCountPatients();
  this.props.selectPatients();
  this.setState({ open: false });
}

async fillFields(patientId) {
  const selectedPatient = await this.apiClient.getPatient(patientId);

  this.setState({ selectedId: patientId });
  this.setState({ selectedName: selectedPatient.name });
  this.setState({ selectedCity: selectedPatient.city });
  this.setState({ selectedStreet: selectedPatient.street });
  this.setState({ selectedEmail: selectedPatient.email ? selectedPatient.email : ''});
  //this.setState({ selectedBornDate: moment(selectedPatient.dateBorn).format('YYYY-MM-DD') });
  this.setState({ selectedBornDate: selectedPatient.dateBorn});
  this.setState({ selectedPhone: selectedPatient.phone });
  this.setState({ selectedNationality: (selectedPatient.nationality === 'BY') ? '1' : '0' });
  this.setState({ selectedDescription: selectedPatient.description ? selectedPatient.description : ''});
}

  render() {
    return (
      <div>
        <Dialog onClose={() => this.onClose()} aria-labelledby="customized-dialog-title" open={this.state.open}>
          <DialogTitle id="customized-dialog-title" 
            onClose={() => this.onClose()} 
            style={{ fontSize: "5px" }}
            >
              {this.props.valueForm}
          </DialogTitle>
          <DialogContent dividers>
            <FormGroup>
              <div>
                <TextField id="outlined-basic-fio" label="Введите ФИО пациента" variant="outlined" 
                    style={{ width: "500px", marginBottom: "20px" }}
                    onChange={(event) => this.onFioInput(event)}
                    value={this.state.selectedName}
                    error={this.state.errorName}/>
              </div>
              <div>
                <TextField id="outlined-basic-city" label="Введите город проживания" variant="outlined" 
                    style={{ width: "500px", marginBottom: "20px" }}
                    onChange={(event) => this.onCityInput(event)}
                    value={this.state.selectedCity}
                    error={this.state.errorCity}/>
              </div>
              <div>
                <TextField id="outlined-basic-street" label="Введите адрес проживания" variant="outlined" 
                    style={{ width: "500px", marginBottom: "20px" }}
                    onChange={(event) => this.onStreetInput(event)}
                    value={this.state.selectedStreet}
                    error={this.state.errorStreet}/>
              </div>
              <div>
                <TextField id="outlined-basic-phone" label="Введите контактный телефон" variant="outlined" 
                    style={{ width: "500px", marginBottom: "20px" }}
                    onChange={(event) => this.onPhoneInput(event)}
                    value={this.state.selectedPhone}
                    error={this.state.errorPhone}/>
              </div>
              <div>
                <TextField id="outlined-basic-email" label="Введите адрес электронной почты" variant="outlined" 
                    style={{ width: "500px", marginBottom: "20px" }}
                    onChange={(event) => this.onEmailInput(event)}
                    value={this.state.selectedEmail}/>
              </div>
              <div>
                <DatePicker id="date-born" labelvalue={"Введите дату рождения"} 
                  onSelected={ (value) => this.onDateBornSelect(value) } 
                  selectedDate={this.state.selectedBornDate}                  
                  />
              </div>
              <div style={{ height: "20px" }}>                
              </div>
              <div>
              <FormLabel component="legend">Национальность</FormLabel>
              <RadioGroup aria-label="gender" name="gender1" 
                  value={this.state.selectedNationality} 
                  onChange={(event) => this.onNationalityInput(event)} 
                  >
                <FormControlLabel value="1" control={<Radio style={{ color: "green" }} />} label="Республика Беларусь" />
                <FormControlLabel value="0" control={<Radio style={{ color: "green" }} />} label="Иностранное государство" />
              </RadioGroup>
              </div>
              <div>
                <TextField id="outlined-basic" label="Введите комментарий" variant="outlined" 
                    style={{ width: "500px", marginBottom: "20px" }}
                    onChange={(event) => this.onDescriptionInput(event)}
                    value={this.state.selectedDescription}/>
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
                onClick={() => this.onButtonSave()}
                >{this.props.valueButtonSave}
              </Button>

              <Button
                variant="outlined"
                color="primary"
                endIcon={<HomeOutlinedIcon />}
                //onClick={() => this.setState({ open: false })}
                onClick={() => this.onClose()}
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

  async editPatient(jsonTalon) {     
    const res = await this.apiClient.editPatient(jsonTalon);    
    return res;
  }

  async deletePatient(patientId) {
    const res = this.apiClient.delPatient(patientId);
    return res;
}
}
