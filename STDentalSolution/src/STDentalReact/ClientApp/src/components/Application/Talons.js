import React, { Component } from 'react'
import { Container, Row, Col, Table } from 'reactstrap';
import './Talons.css';
import ComboBoxT from './Combobox.component';
import DateTimeT from './Datetimepicker.component';

import Loader from './Loader';
import DetailRowView from './DetailRowView';
import TalonServices from './TalonServices';
import { MenuAdministrator } from './MenuAdministrator';
import Pagination from './Pagination';

export class Talons extends Component{

    constructor(props){
        super(props);

        this.state = {
            loading: true,
            talons: [],
            selectedTalon: null,
            patients: [],
            doctors: [],
            selectedPatientId: 0,
            selectedDoctorId: 0,
            selectedStartDate: null,
            selectedEndDate: null,
            currentPage: 1,
            talonsPerPage: 15
        }

        this.onRowSelect = this.onRowSelect.bind(this);
        this.onClickPatient = this.onClickPatient.bind(this);
        this.onPatientSelect = this.onPatientSelect.bind(this);
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

    onPatientSelect = value => {
        this.setState({ selectPatientId: value.id })
    }

    onDoctorSelect = value => {
        this.setState({ selectedDoctorId: value.id })
    }

    onClickPatient = row => (
        (row !== null) && (
            this.setState({selectedPatient: row})
        )
    )

    renderTalonsTable() {      

        const indexOfLastTalon = this.state.currentPage * this.state.talonsPerPage;
        const indexOfFirstTalon = indexOfLastTalon - this.state.talonsPerPage;
        const currentTalons = this.state.talons.slice(indexOfFirstTalon, indexOfLastTalon);

        const paginate = pageNum => this.setState({currentPage: pageNum});

        const nextPage = () => this.setState({ currentPage: this.state.currentPage + 1});

        const prevPage = () => this.setState({ currentPage: this.state.currentPage - 1});

        return (
            <div>
            <MenuAdministrator />
            <div>
                {`selectPatientId: ${this.state.selectPatientId}`}
                {`selectedDoctorId: ${this.state.selectedDoctorId}`}
            </div>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="">Выбран талон: </span>
                </div>
                    <input type="text" value="№ 56944" style={{ width: "110px", textAlign: "center" }} readOnly />
                    <input type="text" value="Пациент - Астаповчик ю.А." style={{ width: "250px", textAlign: "center" }} readOnly />
                    <input type="text" value="Врач - Алибегов А.А" style={{ width: "250px", textAlign: "center" }} readOnly />
                    <input type="text" value="Дата талона - 25.25.2020" style={{ width: "250px", textAlign: "center" }} readOnly />
                    <input type="text" value="Итого по талону - 52336,36" style={{ width: "250px", textAlign: "center" }} readOnly />
            </div> 
            <div style={{height: "20px"}}>
                </div>           
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                            <ComboBoxT labelvalue={"Выберите пациента"} fios={this.state.patients} 
                            onSelected={ (value) => this.onPatientSelect(value) }/>
                    </div>
                    <div className="col-sm">
                            <ComboBoxT labelvalue={"Выберите врача"} fios={this.state.doctors} 
                            onSelected={ (value) => this.onDoctorSelect(value) }/>
                    </div>
                    <div className="col-sm">
                        <DateTimeT labelvalue={"Начало периода"}/>
                    </div>
                    <div className="col-sm">
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
                    {currentTalons.map(talon =>
                        <tr key={talon.talonId} className={talon.talonStatus} onClick={() => this.onRowSelect(talon)}>
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
                <Pagination talonsPerPage={this.state.talonsPerPage} totalTalons={this.state.talons.length} 
                paginate={paginate} nextPage={nextPage} prevPage={prevPage}/>
            </div>
            </div>
        );
    }

    render(){   
        let contents = this.state.loading
        ? <Loader />
        : this.renderTalonsTable();

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