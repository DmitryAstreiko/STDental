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
import { yellow } from '@material-ui/core/colors';
import { Component } from 'react';
import { Table } from 'reactstrap';

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

export default class ViewTalonServices extends Component {
  
  constructor(props){
    super(props);

    this.state = {
    open: false,
    services: []
  }
}

  render() {
    return (
      <div>
        {/*<Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Open dialog
        </Button>*/}
        <IconButton 
            aria-label="view" 
            style={{ color: yellow[900] }}
            onClick={() => (this.populateTalonServices(this.props.talonNumber), this.setState({ open: true }))}>
            <AssignmentOutlinedIcon fontSize="small" />
        </IconButton>
        <Dialog onClose={() => this.setState({ open: false })} aria-labelledby="customized-dialog-title" open={this.state.open}>
          <DialogTitle id="customized-dialog-title" 
            onClose={() => this.setState({ open: false })} 
            style={{ fontSize: "5px" }}>
              Услуги используемые в талоне № {this.props.talonNumber}. Пациент - {this.props.patinetN}
          </DialogTitle>
          <DialogContent dividers>
            {/*<Typography gutterBottom>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
              in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            </Typography>
            <Typography gutterBottom>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
              lacus vel augue laoreet rutrum faucibus dolor auctor.
            </Typography>
            <Typography gutterBottom>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
              scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
              auctor fringilla.
            </Typography>*/}

            <Table className='table' aria-labelledby="tabelLabel">
              <thead>
                  <tr>
                    <th>№ п.п.</th>
                    <th>Шифр</th>
                    <th>Наименование</th>
                    <th>Стоимость</th>
                    <th>Количество</th>
                    <th>Сумма</th>
                  </tr>
              </thead>           
                  <tbody>
                      {this.state.services.map((service, index) =>
                        <tr key={service.Id}  >
                              <td>{index + 1}</td>
                              <td>{service.shifr}</td>
                              <td>{service.serviceName}</td> 
                              <td>{service.price.toFixed(2)}</td>
                              <td>{service.amount}</td>  
                              <td>{service.cost.toFixed(2)}</td>                                                                                
                          </tr>
                      )}
                  </tbody>                  
          </Table> 

          </DialogContent>
          <DialogActions>
            {/*<Button autoFocus onClick={handleClose} color="primary">*/}
            <Button onClick={() => this.setState({ open: false })} color="primary">
              Закрыть
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  async populateTalonServices(talonId) {  
    console.log(`populateTalonServices`);      
    const response = await fetch(`talons/services?talonid=${talonId}`);
    const data = await response.json();   
    this.setState({ services: data });
}
}
