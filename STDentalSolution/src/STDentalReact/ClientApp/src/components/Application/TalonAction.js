import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import { MenuAdministrator } from './MenuAdministrator';
import {Container} from 'reactstrap';
import ComboBox from './Combobox.component';

export class TalonAction extends Component{

    constructor(props){
        super(props);

        this.state = {
            selectedPatientId: null,
            selectedDoctorId: null,
            patients: null,
            doctors: null,
            selectedPatientId: null,
            selectedDoctorId: null
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

    onDoctorSelect = value => {
        //this.setState({ selectedDoctorId: value && value.id })
    }

    render(){
        return (
            <div>
                <MenuAdministrator />
                <Container>
                    <div>
                        <div className="row">
                            <div className="col-sm">
                                <ComboBox labelvalue={"Выберите пациента"} lists={this.state.patients} 
                                    onSelected={ (value) => this.onPatientSelect(value) } nameid={"combopatient"} />
                            </div>
                            <div className="col-sm">
                                <ComboBox labelvalue={"Выберите врача"} lists={this.state.doctors} 
                                    onSelected={ (value) => this.onDoctorSelect(value) } nameid={"combodoctor"} />                                
                            </div>
                        </div>
                        <div className="row" style={{ height: "20px" }}></div>
                        <div className="row">
                            <ComboBox labelvalue={"Выберите услугу"} lists={this.state.prices} 
                                onSelected={ (value) => this.onPriceSelect(value) } nameid={"comboprice"} 
                                style={{ width:"600px" }}/>
                        </div>
                        <div className="row" style={{ height: "20px" }}></div>
                        <div className="row"></div>
                        <div className="row"></div>
                    </div>
                </Container>
                <p>dfasfsadfsdf</p>
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
        this.setState({ patients: data });
    }

}