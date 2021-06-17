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
import ContactlessOutlinedIcon from '@material-ui/icons/ContactlessOutlined';
import { purple } from '@material-ui/core/colors';
import { Component } from 'react';
//import Table from '@material-ui/core/Table';
//import TableBody from '@material-ui/core/TableBody';
//import TableCell from '@material-ui/core/TableCell';
//import TableContainer from '@material-ui/core/TableContainer';
//import TableHead from '@material-ui/core/TableHead';
//import TableRow from '@material-ui/core/TableRow';
//import Paper from '@material-ui/core/Paper';
//import { ApiClient } from './APIClient';
import paymentImage from './Images/payment.png';

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


export default class Payment extends Component {
  
  constructor(props){
    super(props);

    this.state = {
    open: false,
    //services: []
  }

  //this.apiClient = new ApiClient();
}

    render() {

    return (
        <div>
        <IconButton 
            aria-label="pay" 
            style={{ color: purple[500] }}
            onClick={() => this.setState({ open: true })}>
            <ContactlessOutlinedIcon fontSize="small" />
        </IconButton>
        <Dialog onClose={() => this.setState({ open: false })}  
            open={this.state.open} 
            maxWidth="xl"
            aria-labelledby="customized-dialog-title">
            <DialogTitle 
            id="customized-dialog-title" 
            onClose={() => this.setState({ open: false })} 
            style={{ fontSize: "5px" }}>
                Разделе «Оплата»  
            </DialogTitle>
            <DialogContent dividers>
            <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
                <img src={paymentImage} alt="paymentImage" style={{ width: "80%", margin: "20px" }}/>
            </div>           
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
/*
  async populateTalonServices(talonId) {       
    const response = await fetch(`talons/services?talonid=${talonId}`);
    const res = await response.json();   

    //const res = this.apiClient.GetTalonServices(talonId);

    this.setState({ services: res });
  }
  */
}
