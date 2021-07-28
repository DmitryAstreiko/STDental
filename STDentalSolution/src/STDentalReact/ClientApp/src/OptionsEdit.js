import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Component } from 'react';
import { FormGroup } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
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

export default class OptionsEdit extends Component {
  
  constructor(props){
    super(props);

    this.state = {
    open: true,
    selectedName: '',
    errorName: false,
  }

  this.apiClient = new ApiClient();
}

onOptionInput(event) {  
  this.setState({ selectedName: event.target.value }, () => this.validateOption());
}

validateOption() {
  let isValid = !!this.state.selectedName;
  this.setState({errorName: !isValid});
  return isValid;
}

async onEditOption(newjson) {
  try{
      const res = await this.editOption(newjson);

      if(res === 200) {
        alert(`Параметр успешно обновлен!`);
        this.onClose();
      }

      if(res === 400) alert("Параметр не обновлен!");
  }
  catch {
      alert("Не удалось обновить параметр.");
  }
}

onButtonSave() { 
  let newOption = {
    optionId: this.props.optionId,
    name: this.state.selectedName,
  };

  const newjson = JSON.stringify(newOption, null, '\t');

  this.onEditOption(newjson);
}

onClose() {  
  this.props.changeState();
  this.setState({ open: false });
}

  render() {
    return (
      <div>
        <Dialog onClose={() => this.onClose()} aria-labelledby="customized-dialog-title" open={this.state.open}>
          <DialogTitle id="customized-dialog-title" 
            onClose={() => this.onClose()} 
            style={{ fontSize: "5px" }}
            >
              {this.props.labelAction}
          </DialogTitle>
          <DialogContent dividers>
            <FormGroup>
              <div>
                <TextField id="outlined-basic-fio" label="Введите наименование параметра" variant="outlined" 
                    style={{ width: "500px", marginBottom: "20px" }}
                    onChange={(event) => this.onOptionInput(event)}
                    value={this.state.selectedName}
                    error={this.state.errorName}/>
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
                >Сохранить
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

  async editOption(jsonTalon) {     
    const res = await this.apiClient.editOption(jsonTalon);    
    return res;
  }

}
