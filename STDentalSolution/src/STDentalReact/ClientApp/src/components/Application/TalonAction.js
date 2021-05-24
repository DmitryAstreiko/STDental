import React, { Component } from 'react';
//import Modal from '@material-ui/core/Modal';
import { MenuAdministrator } from './MenuAdministrator';
import { Table } from 'reactstrap';
import ComboBox from './Combobox.component';
import Button from '@material-ui/core/Button';
import './TalonAction.css';
import DatePicker from './Picker.component';
import * as moment  from 'moment';
//import TextField from '@material-ui/core/TextField';
//import Input from '@material-ui/core/Input';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
// { Link } from 'react-router-dom';
//import { ThemeProvider } from '@material-ui/styles';

export class TalonAction extends Component{

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
            descriptionTalon: null
            }

        /*this.onClickPatient = this.onClickPatient.bind(this);
        this.onPatientSelect = this.onPatientSelect.bind(this);*/
    }

    componentDidMount() {
        this.populatePatients();
        this.populateDoctors();
        this.populatePrices();        
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
            this.populateSelectedPrice(value.id))    

        this.CountCostAllTalons()
    }

    onChangeCount(evt, index) {

        let servArray = this.state.tableServices;
        let newCost = (parseInt(evt.target.value) * servArray[index].price);

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
        //let res = moment(value).format('DD.MM.YYYY')
        this.setState({ selectedTalonDate: moment(value).format('DD.MM.YYYY') })
    }

    deleteRowTalon = value => {
        let rows = this.state.tableServices;

        rows.splice(value, 1); 
        this.setState({tableServices: rows});

        this.CountCostAllTalons();
    }

    onSaveTalon() {
        //check doctor, patient, tablesservices

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
            //talonservice: {newTalonService}
            tableServices: newTalonService
        }
        
        let newjson = JSON.stringify(newTalon, null, '\t')

        console.log(newjson);

        this.addTalon(newjson);
    }

    render(){
        //console.log(this.state.tableServices[0]);
        return (
            <div>
                <MenuAdministrator />           
                <div >
                    <div className={"d-flex justify-content-around"} style={{ marginBottom: "20px" }}>
                        <div>
                            <ComboBox labelvalue={"Выберите пациента"} lists={this.state.patients} 
                                onSelected={ (value) => this.onPatientSelect(value) } nameid={"combopatientprice"} 
                                widthValue={350} />
                        </div>
                        <div className={"d-flex justify-content-center"} >
                            <ComboBox labelvalue={"Выберите услугу"} lists={this.state.prices} 
                                onSelected={ (value) => this.onPriceSelect(value) } nameid={"comboprice"} 
                                widthValue={800} />
                    </div>
                        <div >
                            <ComboBox labelvalue={"Выберите врача"} lists={this.state.doctors} 
                                onSelected={ (value) => this.onDoctorSelect(value) } nameid={"combodoctorprice"} 
                                widthValue={300} />                                
                        </div>
                    </div>                       
                </div>

                <div >
                    <div className="row">
                        <Table className='table' aria-labelledby="tabelLabel">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>№ п.п.</th>
                                <th>Шифр</th>
                                <th style={{width: "600px"}}>Наименование</th>
                                <th>Стоимость</th>
                                <th>Количество</th>
                                <th>Сумма</th>
                                <th>Действие</th>
                            </tr>
                        </thead>           
                            <tbody>
                                {this.state.tableServices.map((service, index) =>
                                    <tr key={index} style={{ height: "50px" }}>
                                        <td>{service.id}</td>
                                        <td>{service.amount}</td>
                                        <td>{service.shifr}</td>
                                        <td>{service.name}</td> 
                                        <td>{service.price}</td>   
                                        <td >
                                            <input type="number" defaultValue="1" min="1" max="50" keyin={index} onChange={ (evt) => this.onChangeCount(evt, index) }
                                                style={{ height: "20px" }}/>    
                                        </td>
                                        <td>{service.cost}</td>
                                        <td>
                                            <Button
                                                //variant="contained"
                                                variant="outlined"
                                                color="secondary"
                                                size="small"
                                                //className={classes.button}
                                                startIcon={<DeleteIcon />}
                                                height="15px"
                                                keybut={index} 
                                                onClick={ () => (this.deleteRowTalon(index)) }
                                            >
                                                Удалить
                                            </Button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>                  
                        </Table>
                    </div>

                    <div className={"d-flex justify-content-around"} style={{ marginTop: "20px" }}>
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
                                <input type="text" value={this.state.selectedCost ? `${this.state.selectedCost}` : `0.00`} style={{ width: "150px", textAlign: "center" }} readOnly />
                            </div>
                        </div>
                    </div>

                    <div className={"d-flex justify-content-around"} style={{ marginTop: "20px" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        //className={classes.button}
                        startIcon={<SaveIcon />}
                        //style={{ background: "yellow" }}
                        onClick={() => this.onSaveTalon()}
                    >
                        Сохранить
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        //className={classes.button}
                        endIcon={<Icon>reply</Icon>}
                        //style={{ background: 'green' }}
                        //onClick={() => { alert('clicked') }}
                        href="/appdental/administrator/talons"
                    >
                        Закрыть
                    </Button>
                    </div>

                </div>                
            </div>
        )    
    }

    async populateDoctors() {        
        const response = await fetch('staffs');
        const data = await response.json();   
        this.setState({ doctors: data });
    }

    async populatePatients() {        
        const response = await fetch('patients');
        const data = await response.json();   
        this.setState({ patients: data });
    }

    async populatePrices() {        
        const response = await fetch('services/comboservices');
        const data = await response.json();   
        this.setState({ prices: data });
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

    async addTalon(jsonTalon) {
     
            const response = await fetch(`talons/addtalon`, 
                {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                    body: jsonTalon
                });
    
            const res = await response.json();

            console.log(`addTalon = ${res}`);     
       
    }
}