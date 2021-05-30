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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
        <IconButton 
            aria-label="view" 
            style={{ color: yellow[900] }}
            onClick={() => (this.populateTalonServices(this.props.talonNumber), this.setState({ open: true }))}>
            <AssignmentOutlinedIcon fontSize="small" />
        </IconButton>
        <Dialog onClose={() => this.setState({ open: false })}  
          open={this.state.open} 
          maxWidth="true"
          aria-labelledby="customized-dialog-title">
          <DialogTitle 
            id="customized-dialog-title" 
            onClose={() => this.setState({ open: false })} 
            style={{ fontSize: "5px" }}>
              Услуги, используемые в талоне № {this.props.talonNumber}. Пациент - {this.props.patinetN}
          </DialogTitle>
          <DialogContent dividers>
            <TableContainer component={Paper}>
              <Table size="small" aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">№&nbsp;п.п.</TableCell>
                    <TableCell align="center">Шифр</TableCell>
                    <TableCell align="center">Наименование</TableCell>
                    <TableCell align="center">Стоимость&nbsp;(руб.)</TableCell>
                    <TableCell align="center">Количество&nbsp;(шт.)</TableCell>
                    <TableCell align="center">Сумма&nbsp;(руб.)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.services.map((service, index) => (
                    <TableRow key={service.Id} >
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{service.shifr}</TableCell>
                      <TableCell align="left">{service.serviceName}</TableCell>
                      <TableCell align="center">{service.price.toFixed(2)}</TableCell>
                      <TableCell align="center">{service.amount}</TableCell>
                      <TableCell align="center">{service.cost.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>          
          </DialogContent>
          <DialogActions>
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
