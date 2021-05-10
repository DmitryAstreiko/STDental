import React, { Component } from 'react'
import { Container, Row, Col, Table } from 'reactstrap';
import './Talons.css';
import ComboBoxT from './Combobox.component';
import DateTimeT from './Datetimepicker.component';

import Loader from './Loader';
import DetailRowView from './DetailRowView';
import TalonServices from './TalonServices';
import { MenuAdministrator } from './MenuAdministrator';

export class Talons extends Component{

    constructor(props){
        super(props);

        this.state = {
            loading: true,
            talons: [],
            selectedTalon: null,
            patients: [],
            doctors: [],
            selectedPatient: [],
            selectedDoctor: [],
            selectedStartDate: null,
            selectedEndDate: null
        }

        this.onRowSelect = this.onRowSelect.bind(this);
        this.onClickPatient = this.onClickPatient.bind(this);
    }

    componentDidMount() {
        this.populateTalons();
        this.populatePatients();
        this.populateDoctors();
    } 

    onRowSelect = row => ( 
        (row !== null) && (
            this.setState({selectedTalon: row}),
            <TalonServices talonId="1" />
        )              
    )

    onPatientSelect = row => ( 
            this.setState({selectPatient: row}),
        )              
    )

    onClickPatient = row => (
        (row !== null) && (
            this.setState({selectedPatient: row})
        )
    )

    static renderTalonsTable(talons, onRowSelect, fioPatients, fioDoctors, onPatientSelect) {      
        return (
            <div>
            <MenuAdministrator />
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="">Выбран талон: </span>
                </div>
                <input type="text" value="№ 56944" style={{width: "110px", textAlign: "center"}}/>
                <input type="text" value="Пациент - Астаповчик ю.А." style={{width: "250px", textAlign: "center"}}/>
                <input type="text" value="Врач - Алибегов А.А" style={{width: "250px", textAlign: "center"}}/>
                <input type="text" value="Дата талона - 25.25.2020" style={{width: "250px", textAlign: "center"}}/>
                <input type="text" value="Итого по талону - 52336,36" style={{width: "250px", textAlign: "center"}}/>
            </div> 
            <div style={{height: "20px"}}>
                </div>           
            <div class="container">
                <div class="row">
                    <div class="col-sm">
                        <ComboBoxT labelvalue={"Выберите пациента"} fios={fioPatients} onClick={onPatientSelect.bind(null, talon)}/>
                    </div>
                    <div class="col-sm">
                        <ComboBoxT labelvalue={"Выберите врача"} fios={fioDoctors} />
                    </div>
                    <div class="col-sm">
                        <DateTimeT labelvalue={"Начало периода"}/>
                    </div>
                    <div class="col-sm">
                        <DateTimeT labelvalue={"Окончание периода"}/>
                    </div>
                </div>
                </div>
            <div>
            <div style={{height: "20px"}}>
                </div>
            <Table className='table' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>№ талона</th>
                        <th>ФИО пациента</th>
                        <th>ФИО врача</th>
                        <th>Стоимость</th>
                        <th>Со скидкой</th>
                        <th>Дата талона</th>
                        <th>Комментарий</th>
                    </tr>
                </thead>
                <tbody>
                    {talons.map(talon =>
                        <tr key={talon.talonId} className={talon.talonStatus} onClick={onRowSelect.bind(null, talon)}>
                            <td>{talon.talonId}</td>
                            <td>{talon.patientName}</td>
                            <td>{talon.staffName}</td> 
                            <td>{talon.summa}</td>   
                            <td>{talon.cost}</td>
                            <td>{talon.createDate}</td>
                            <td>{talon.description}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            </div>
            </div>
        );
    }

    render(){   
        let contents = this.state.loading
        ? <Loader />
        : Talons.renderTalonsTable(this.state.talons, this.onRowSelect, this.state.patients, this.state.doctors);

        return (
        <div>
        {
            contents
            //<TalonServices talonid={this.selectedTalon.talonId}/>
        }   
        {
        //this.state.row ? <DetailRowView person={this.state.row} /> : null
        //    <DetailRowView />
        }     
        </div>
        )
    }

    async populateTalons() {        
        const response = await fetch('talons');
        const data = await response.json();   
        this.setState({ talons: data, loading: false });
    }

    async populatePatients() {        
        const response = await fetch('patients');
        const data = await response.json();   
        this.setState({ patients: data, loading: false });
    }
    
    async populateDoctors() {        
        const response = await fetch('staffs');
        const data = await response.json();   
        this.setState({ doctors: data, loading: false });
    }
}