import React, { Component } from 'react';
//import { MenuAdministrator } from './MenuAdministrator';
import { Table } from 'reactstrap';
import ComboBox from './Combobox.component';
import Button from '@material-ui/core/Button';
import './TalonCUD.css';
import DatePicker from './Picker.component';
import * as moment  from 'moment';
//import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import {ApiClient} from './APIClient';
import IconButton from '@material-ui/core/IconButton';
import Loader from './Loader';
import { InputBase, InputLabel } from '@material-ui/core';

export class TalonCUD extends Component{
    constructor(props){
        super(props);

        this.state = {
            selectedPatientId: null,
            selectedDoctorId: null,
            patients: null,
            doctors: null,
            tableServices: [],
            selectedTalonDate: moment(new Date()).format('YYYY-MM-DD'),
            selectedCost: null,
            descriptionTalon: null,
            addedTalonId: null,
            redirect: false,
            loadingTalonService: true,
            errorPatient: false,
            errorDoctor: false,
            disableDeleteButton: false
            }

        this.apiClient = new ApiClient();
    }

    componentDidMount() {
        this.populatePatients();
        this.populateDoctors(); 
        this.populatePrices();

        if (this.props.flagTalonCreate) {
            this.setState({ loadingTalonService: false });
        }

        if (this.props.flagTalonEdit) {            
            this.populateTalonServices(this.props.talonId);          
            this.fillFields(this.props.talonId);
        }   
        
        if (this.props.flagTalonDelete) {            
            this.populateTalonServices(this.props.talonId);          
            this.fillFields(this.props.talonId);
            this.setState({ disableDeleteButton: true });
        }  
    } 

    onPatientSelect = value => {
        this.setState({ selectedPatientId: value && value.id })
    }

    onDoctorSelect = value => {
        this.setState({ selectedDoctorId: value && value.id })
    }

    /*onPriceSelect = value => {     
        //this.setState({ selectedServiceId: value && value.id });
        (value) && (
            this.populateSelectedPrice(value.id),
            this.CountCostAllTalons()
        )        
    }*/

    onPriceSelect(value) {     
        (value) && (
            this.populateSelectedPrice(value.id));

        this.CountCostAllTalons();
    }

    onChangeCount(evt, index) {

        let amountService = parseInt(evt.target.value);
        let servArray = this.state.tableServices;
        let newCost = amountService * servArray[index].price;

        servArray[index].amount =  amountService;
        servArray[index].cost =  newCost;

        this.setState({ tableServices: servArray });

        this.CountCostAllTalons();
    }

    CountCostAllTalons() {

        let servicesTal = this.state.tableServices;
        let newSumCost = 0.00;

        servicesTal.forEach(service => {
            newSumCost = parseFloat(service.cost) + newSumCost;
        });

        this.setState({ selectedCost: newSumCost });
    }

    onDateStartSelect = value => {
        this.setState({ selectedTalonDate: moment(value).format('YYYY-MM-DD') })
    }

    deleteRowTalon = value => {
        let rows = this.state.tableServices;

        rows.splice(value, 1); 
        this.setState({tableServices: rows});

        this.CountCostAllTalons();
    }

    validateDoctor() {
        let isValid = !!this.state.selectedDoctorId;
        this.setState({errorDoctor: !isValid});
        return isValid;
    }

    validatePatient() {
        let isValid = !!this.state.selectedPatientId;
        this.setState({errorPatient: !isValid});
        return isValid;
    }

    onButtonSave() {   
        
        //const flagDoctor = this.validateDoctor();
        //const flagPatient = this.validatePatient();

        //if (flagDoctor && flagPatient && (this.state.tableServices.length > 0)) { 
            let newTalonService = [];

            this.state.tableServices.forEach(service => {
                
                let rowService = {
                    price: service.price,
                    amount: service.amount,
                    cost: service.cost,
                    serviceid: service.id
                };

                newTalonService.push(rowService);
            });

            let newTalon = {
                createdate: this.state.selectedTalonDate,
                summa: this.state.selectedCost,
                sale: 0,
                summasales: 0,
                cost: this.state.selectedCost,
                paymentstatus: 1,
                description: this.state.descriptionTalon,
                patientid: this.state.selectedPatientId,
                staffid: this.state.selectedDoctorId,
                talonservices: newTalonService
            }
            
            let newjson = JSON.stringify(newTalon, null, '\t');

            this.props.flagTalonCreate && this.onAddTalon(newjson);

            this.props.flagTalonEdit && this.onAddEdit(newjson);

            this.props.flagTalonDelete && this.onDeleteTalon(this.props.talonId);
        //}
    }

    async onAddTalon(newjson) {   
        try{
            //const res = await this.addTalon(newjson);
            const res = await this.apiClient.addTalon(newjson)
            console.log(res);
            if(res === 200) {
            alert(`Талон успешно добавлен!`);
            this.onClose();
            }
            if(res === 400) alert("Талон не добавлен в систему!");
        }
        catch {
            alert("Не удалось добавить талон.");
        }
    }

    async onEditTalon(newjson) {
        try{
            const res = await this.editPatient(newjson);
    
            if(res === 200) {
            alert(`Талон успешно обновлен!`);
            this.onClose();
            }
    
            if(res === 400) alert("Талон не обновлен!");
        }
        catch {
            alert("Не удалось обновить реквизиты талона.");
        }
    }
    
    async onDeleteTalon(talonId) {
        try{
            //const res = await this.deleteTalon(talonId);
            const res = await this.apiClient.deleteTalon(talonId);
    
            if(res === 200) {
                alert(`Талон успешно удален!`);
                this.onClose();
            }
    
            if(res === 400) alert("Талон не удален!");
        }
        catch {
            alert("Не удалось удалить талон.");
        }
    }

    onClose() {
        this.props.closingPatient();
        this.props.countTalon();
        this.props.getTalons();
    }

    onDescriptionChange(evt) {
        this.setState({ descriptionTalon: evt.target.value })
    }

    async fillFields(talonId) {
        const response = await fetch(`talons/talon?talonid=${talonId}`);
        const res = await response.json(); 

        //const res = this.apiClient.GetTalon(talonId);
        this.setState({ descriptionTalon: res.description });
        this.setState({ selectedCost: res.cost });
    }

    render(){
        {/*const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/appdental/administrator/talons'/>;
        }*/}
        return (
            <div>
                {/*<MenuAdministrator />*/}
                <div >
                    <div>
                        <InputLabel style={{ textAlign: "center", marginBottom: "15px", color: "blue" }}
                        variant="standard"
                        >{this.props.labelAction}</InputLabel>
                    </div>
                    <div className={"d-flex justify-content-around"} style={{ marginBottom: "20px" }}>
                        <div>
                            <ComboBox labelvalue={"Выберите пациента"} lists={this.state.patients} 
                                onSelected={ (value) => this.onPatientSelect(value) } nameid={"combopatientprice"} 
                                widthValue={350} 
                                //error={this.state.errorPatient}
                                //value={this.state.selectedPatientId} 
                                error={true}
                                />
                        </div>
                        <div className={"d-flex justify-content-center"} >
                            <ComboBox labelvalue={"Выберите услугу"} lists={this.state.prices} 
                                onSelected={ (value) => this.onPriceSelect(value) } nameid={"comboprice"} 
                                widthValue={800} />
                    </div>
                        <div >
                            <ComboBox labelvalue={"Выберите врача"} lists={this.state.doctors} 
                                onSelected={ (value) => this.onDoctorSelect(value) } nameid={"combodoctorprice"} 
                                widthValue={300} 
                                error={false}
                                //error={this.state.errorDoctor}
                                //value={this.state.selectedDoctorId} 
                                />                                
                        </div>
                    </div>                       
                </div>

                <div >
                    {this.state.loadingTalonService ? (
                        <Loader />
                    ) :
                    (
                    <div className="row">
                        <Table className='table' aria-labelledby="tabelLabel">
                        <thead>
                            <tr>
                                <th>№ п.п.</th>
                                <th>Шифр</th>
                                <th style={{width: "600px"}}>Наименование</th>
                                <th>Стоимость</th>
                                <th>Количество</th>
                                <th>Сумма</th>
                                <th></th>
                            </tr>
                        </thead>           
                            <tbody>
                                {this.state.tableServices.map((service, index) =>
                                    <tr key={index} style={{ height: "50px" }}>
                                        <td style={{ width: "100px" }}>{index + 1}</td>
                                        <td>{service.shifr}</td>
                                        <td style={{ textAlign: "left", paddingLeft: "5px" }}>{service.serviceName}</td> 
                                        <td>{service.price.toFixed(2)}</td>   
                                        <td >
                                            <input type="number" defaultValue="1" min="1" max="50" keyin={index} onChange={ (evt) => this.onChangeCount(evt, index) }
                                                style={{ height: "20px" }}/>    
                                        </td>
                                        <td>{service.cost.toFixed(2)}</td>
                                        <td>
                                            <IconButton 
                                                aria-label="delete" 
                                                color="secondary"
                                                onClick={ () => (this.deleteRowTalon(index)) }
                                                disabled={this.state.disableDeleteButton}>
                                                <DeleteIcon fontSize="small"/>
                                            </IconButton>
                                        </td>
                                    </tr>
                                )}
                            </tbody>                  
                        </Table>
                    </div>
                    )}

                    <div className={"d-flex justify-content-around"} style={{ marginTop: "20px" }}>
                        <div>
                            <TextField id="outlined-basic-description" label="Комментарий" variant="outlined" 
                                style={{ width: "600px", marginTop: "10px" }}                                
                                onChange={(event) => this.onDescriptionChange(event)} 
                                value={this.state.descriptionTalon}/>
                        </div>
                        <div className={"d-flex justify-content-center"} >
                            <div >
                                <DatePicker onSelected={ (value) => this.onDateStartSelect(value) } labelvalue={"Дата выписки талона"}/>
                            </div>            
                        </div>
                        <div className={"d-flex justify-content-center"} style={{ marginTop: "20px" }}>
                            <div className="text-right" style={{width: "200px", marginRight: "20px"}}>
                                Итого по талону: 
                            </div>
                            <div >
                                <input type="text" value={this.state.selectedCost ? `${this.state.selectedCost.toFixed(2)}` : `0.00`} style={{ width: "150px", textAlign: "center" }} readOnly />
                            </div>
                        </div>
                    </div>                   

                    <div className={"d-flex justify-content-around"} style={{ marginTop: "20px" }}>
                    <Button
                        //variant="contained"
                        variant="outlined"
                        color="primary"
                        size="small"
                        //className={classes.button}
                        startIcon={<SaveIcon />}
                        //style={{ background: "yellow" }}
                        onClick={() => this.onButtonSave()}
                    >
                        {this.props.vabelButtonSave}
                    </Button>
                    <Button
                        //variant="contained"
                        variant="outlined"
                        color="primary"
                        //className={classes.button}
                        //endIcon={<Icon>reply</Icon>}
                        endIcon={<HomeOutlinedIcon />}
                        //style={{ background: 'green' }}
                        onClick={() => { this.onClose() }}
                        //href="/appdental/administrator/talons"
                    >
                        Закрыть
                    </Button>
                    </div>

                </div>                
            </div>
        )    
    }

    async populateDoctors() {        
        const res = await this.apiClient.getDoctorNames();   
        this.setState({ doctors: res });
    }

    async populatePatients() {        
        const res = await this.apiClient.getPatientNames();  
        this.setState({ patients: res });
    }

    async populatePrices() {        
        const res = await this.apiClient.getServiceNames()  
        this.setState({ prices: res });
    }

    async populateSelectedPrice(serviceid) {  
        try{ 
            const response = await fetch(`services/service?serviceid=${serviceid}`);
            const data = await response.json(); 
            var tableServices = this.state.tableServices;            
            tableServices.push(data);
            this.setState({ tableServices: tableServices });
            this.CountCostAllTalons();
        }
        catch (error) {
            console.log(`error - ${error}`);
        }
    }

    async populateTalonServices(talonId) {
        const response = await fetch(`talons/services?talonid=${talonId}`);
        const res = await response.json(); 
        this.setState({ tableServices: res, loadingTalonService: false });
    }
}