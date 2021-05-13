import React, { Component } from 'react'
import { Container, Row, Col, Table } from 'reactstrap';
import './Talons.css';
import ComboBox from './Combobox.component';
import DateTime from './Datetimepicker.component';

import Loader from './Loader';
import DetailRowView from './DetailRowView';
import TalonServices from './TalonServices';
import { MenuAdministrator } from './MenuAdministrator';
import Pagination from './Pagination';
import DatePicker from './Picker.component';
import { maskedDateFormatter } from '@material-ui/pickers/_helpers/text-field-helper';
import * as moment  from 'moment';

export class Talons extends Component{

    constructor(props){
        super(props);

        this.state = {
            loadingTalons: true,
            talons: [],
            selectedTalon: [],
            patients: [],
            doctors: [],
            selectedPatientId: null,
            selectedDoctorId: null,
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
        this.populatePatients();
        this.populateDoctors();
        this.populateTalons();
    } 

    onRowSelect = row => (
        //console.log(row) 
        //(row !== null) && (
            this.setState({selectedTalon: row && row})
            /*<TalonServices talonId="1" />*/
             
    )

    onPatientSelect = value => {
        this.setState({ selectPatientId: value && value.id })
    }

    onDoctorSelect = value => {
        this.setState({ selectedDoctorId: value && value.id })
    }

    onDateStartSelect = value => {
        //console.log(value);

        //const result = new Date(value);
        //let res = Date.parse(value)
        let res = moment(value).format('DD.MM.YYYY')
        //console.log(www)
        //console.log(res)
        //console.log(result.getUTCDate())
        this.setState({ selectedStartDate: res })
    }

    onDateEndSelect = value => {
        let res = moment(value).format('DD.MM.YYYY')
        this.setState({ selectedEndDate: res })
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
            </div>
            <div>
                {`selectedDoctorId: ${this.state.selectedDoctorId}`}
            </div>
            <div>
                {`selectedTalon: ${this.state.selectedTalon.talonId}`}
            </div>
            <div>
                {`selectedStartDate: ${this.state.selectedStartDate}`}
            </div>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="">Выбран талон: </span>
                </div>
                    <input type="text" value={`№ ${this.state.selectedTalon.talonId}`} style={{ width: "110px", textAlign: "center" }} readOnly />
                    <input type="text" value={`Пациент - ${this.state.selectedTalon.patientName}`} style={{ width: "250px", textAlign: "center" }} readOnly />
                    <input type="text" value={`Врач - ${this.state.selectedTalon.staffName}`} style={{ width: "250px", textAlign: "center" }} readOnly />
                    <input type="text" value={`Дата талона - ${this.state.selectedTalon.createDate}`} style={{ width: "250px", textAlign: "center" }} readOnly />
                    <input type="text" value={`Итого по талону - ${this.state.selectedTalon.cost}`} style={{ width: "250px", textAlign: "center" }} readOnly />
            </div> 
            <div style={{height: "20px"}}>
                </div>
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <ComboBox labelvalue={"Выберите пациента"} fios={this.state.patients} 
                            onSelected={ (value) => this.onPatientSelect(value) }/>
                    </div>
                    <div className="col-sm">
                        <ComboBox labelvalue={"Выберите врача"} fios={this.state.doctors} 
                            onSelected={ (value) => this.onDoctorSelect(value) }/>
                    </div>
                    <div className="col-sm">
                        <DatePicker labelvalue={"Начало периода"} onSelected={ (value) => this.onDateStartSelect(value) } />
                    </div>
                    <div className="col-sm">
                        <DatePicker labelvalue={"Окончание периода"} onSelected={ (value) => this.onDateEndSelect(value) } />
                    </div>
                    <div className="col-sm">
                        <button>Поиск onClick={}</button>
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
                { this.state.loadingTalons ? (
                <Loader /> ) : ( 
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
                )}

            </Table>
                {this.state.loadingTalons && (<Pagination talonsPerPage={this.state.talonsPerPage} totalTalons={this.state.talons.length} 
                paginate={paginate} nextPage={nextPage} prevPage={prevPage}/>)}
            </div>
            </div>
        );
    }

    render(){   
        /*let contents = this.state.loadingTalons
        ? <Loader />
        : this.renderTalonsTable();*/

        return (
        <div>
        {
            ////contents
            this.renderTalonsTable()
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
        this.setState({ patients: data });
    }
    
    async populateDoctors() {        
        const response = await fetch('staffs');
        const data = await response.json();   
        this.setState({ doctors: data });
    }
}