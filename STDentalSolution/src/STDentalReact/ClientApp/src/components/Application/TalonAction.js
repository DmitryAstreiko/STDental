import React, { Component } from 'react';
//import Modal from '@material-ui/core/Modal';
import { MenuAdministrator } from './MenuAdministrator';
import { Container, Table } from 'reactstrap';
import ComboBox from './Combobox.component';
import './TalonAction.css';
import DatePicker from './Picker.component';
import * as moment  from 'moment';

export class TalonAction extends Component{

    constructor(props){
        super(props);

        this.state = {
            selectedPatientId: null,
            selectedDoctorId: null,
            patients: null,
            doctors: null,
            selectedServiceId: 7,
            tableServices: [],
            selectedTalonDate: null,
            selectedCost: null,
            }
    }

    componentDidMount() {
        //this.populateCountTalons();
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

    onPriceSelect = value => {
        this.setState({ selectedServiceId: value && value.id });
        this.populateSelectedPrice();
    }

    onDateStartSelect = value => {
        //let res = moment(value).format('DD.MM.YYYY')
        this.setState({ selectedTalonDate: moment(value).format('DD.MM.YYYY') })
    }

    render(){
        return (
            <div>
                <MenuAdministrator />
                {this.state.selectedServiceId}
                {this.state.tableServices}
                <Container>
                    <div >
                        <div className="row">
                            <div className="col">
                                <ComboBox labelvalue={"Выберите пациента"} lists={this.state.patients} 
                                    onSelected={ (value) => this.onPatientSelect(value) } nameid={"combopatientprice"} />
                            </div>
                            <div className="col-sm">
                                <ComboBox labelvalue={"Выберите врача"} lists={this.state.doctors} 
                                    onSelected={ (value) => this.onDoctorSelect(value) } nameid={"combodoctorprice"} />                                
                            </div>
                        </div>
                        <div className="row" style={{ height: "20px" }}></div>
                        <div className="row" >
                            <ComboBox labelvalue={"Выберите услугу"} lists={this.state.prices} 
                                onSelected={ (value) => this.onPriceSelect(value) } nameid={"comboprice"} 
                                style={{ width:"600px"}}/>
                        </div>
                        <div className="row" style={{ height: "20px" }}></div>
                    </div>
                </Container>
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
                                <th>...</th>
                            </tr>
                        </thead>           
                            <tbody>
                                {this.state.tableServices.map(service =>
                                    <tr key={service.serviceId}>
                                        <td>{service.serviceId}</td>
                                        <td>{service.number}</td>
                                        <td>{service.shifr}</td>
                                        <td>{service.name}</td> 
                                        <td>{service.price}</td>   
                                        <td>{service.amount}</td>
                                        <td>{service.cost}</td>
                                    </tr>
                                )}
                            </tbody>                  
                        </Table>
                    </div>
                    <div className="row" style={{ height: "20px" }}></div>
                    <div className="row">
                        <div className="text-right" style={{width: "300px"}}>
                            Дата выписки талона: 
                        </div>
                        <div className="col">
                            <DatePicker onSelected={ (value) => this.onDateStartSelect(value) } />
                        </div>
                        <div className="text-right" style={{width: "200px"}}>
                            Итого по талону: 
                        </div>
                        <div className="col-sm">
                            <input type="text" value={this.state.selectedCost ? `${this.state.selectedCost}` : `0.00`} style={{ width: "150px", textAlign: "center" }} readOnly />
                        </div>
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

    async populateSelectedPrice() {        
        const response = await fetch(`services/service?serviceid=${this.state.selectedServiceId}`);
        const data = await response.json();   
        //let list = this.state.tableServices;
        //list.add(data);
        console.log(data);
        this.setState({ tableServices: data[0] });
    }
}