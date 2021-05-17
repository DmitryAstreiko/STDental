import React, { Component } from 'react'
//import { Container, Row, Col, Table } from 'reactstrap';
import { Table } from 'reactstrap';
import './Talons.css';
import ComboBox from './Combobox.component';
//import DateTime from './Datetimepicker.component';
import Button from '@material-ui/core/Button';
import Loader from './Loader';
//import DetailRowView from './DetailRowView';
//import TalonServices from './TalonServices';
import { MenuAdministrator } from './MenuAdministrator';
import Pagination from './Pagination';
import DatePicker from './Picker.component';
//import { maskedDateFormatter } from '@material-ui/pickers/_helpers/text-field-helper';
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
            talonsPerPage: 15,
            generatedFilter: null
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

    onGenerateFilter() {       

        /*{this.state.selectedPatientId && filter.join(filter, `patientid=${this.state.selectedPatientId}`)}
        {this.state.selectedDoctorId && filter.join(filter, `&staffid=${this.state.selectedDoctorId}`)}
        {this.state.selectedStartDate && filter.join(filter, `&startdate=${this.state.selectedStartDate}`)}
        {this.state.selectedEndDate && filter.join(filter, `&enddate=${this.state.selectedEndDate}`)}*/

        //let filterPatient = this.state.selectedPatientId && `patientid=${this.state.selectedPatientId}`;
        //let filterDoctor = this.state.selectedDoctorId && `&staffid=${this.state.selectedDoctorId}`;
        //let filterStartDate = this.state.selectedStartDate && `&startdate=${this.state.selectedStartDate}`;
        //let filterEndDate = this.state.selectedEndDate && `&enddate=${this.state.selectedEndDate}`;
        //console.log(filterPatient);

        let filterTalons = `patientid=1&doctorid=1&startdata=01.05.2021&enddata=01.06.2021`;
        this.setState({ generatedFilter: {filterTalons} });

        this.state.generatedFilter && this.populateFilterTalons(filterTalons)
        
        console.log(`generatedFilter ${this.state.generatedFilter}`);
    }

    renderTalonsTable() {      

        const indexOfLastTalon = this.state.currentPage * this.state.talonsPerPage;
        const indexOfFirstTalon = indexOfLastTalon - this.state.talonsPerPage;
        const currentTalons = this.state.talons.slice(indexOfFirstTalon, indexOfLastTalon);

        const paginate = pageNum => this.setState({currentPage: pageNum});

        const nextPage = () => this.setState({ currentPage: this.state.currentPage + 1});

        //const prevPage = () => this.setState({ currentPage: this.state.currentPage - 1});
        const prevPage = () => this.setState({ currentPage: this.state.currentPage - 1});

        return (
            <div>
                <MenuAdministrator />
            {/*<div>
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
            <div>
                {`selectedEndDate: ${this.state.selectedEndDate}`}
            </div>*/}

            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="">Выбран талон: </span>
                </div>
                    <input type="text" value={this.state.selectedTalon.talonId ? `№ ${this.state.selectedTalon.talonId}` : ``} style={{ width: "110px", textAlign: "center" }} readOnly />
                    <input type="text" value={this.state.selectedTalon.talonId ? `Пациент - ${this.state.selectedTalon.patientName}` : ``} style={{ width: "250px", textAlign: "center" }} readOnly />
                    <input type="text" value={this.state.selectedTalon.talonId ? `Врач - ${this.state.selectedTalon.staffName}` : ``} style={{ width: "250px", textAlign: "center" }} readOnly />
                    <input type="text" value={this.state.selectedTalon.talonId ? `Дата талона - ${this.state.selectedTalon.createDate}` : ``} style={{ width: "250px", textAlign: "center" }} readOnly />
                    <input type="text" value={this.state.selectedTalon.talonId ? `Итого по талону - ${this.state.selectedTalon.cost}` : ``} style={{ width: "250px", textAlign: "center" }} readOnly />
            </div> 
            <div style={{height: "20px"}}>
                </div>
            <div >
                <div className="row">
                    <div className="col-sm">
                        <ComboBox labelvalue={"Выберите пациента"} fios={this.state.patients} 
                            onSelected={ (value) => this.onPatientSelect(value) } nameid={"combopatient"} />
                    </div>
                    <div className="col-sm">
                        <ComboBox labelvalue={"Выберите врача"} fios={this.state.doctors} 
                            onSelected={ (value) => this.onDoctorSelect(value) } nameid={"combodoctor"} />
                    </div>
                    <div className="col-sm">
                        <DatePicker labelvalue={"Начало периода"} onSelected={ (value) => this.onDateStartSelect(value) } />
                    </div>
                    <div className="col-sm">
                        <DatePicker labelvalue={"Окончание периода"} onSelected={ (value) => this.onDateEndSelect(value) } />
                    </div>
                    <div className="col-sm" style={{position: "relative"}}>
                        <Button style={{position: "absolute", top: "50%", transform: "translate(0, -50%)"}} 
                            variant="contained" onClick={ () => this.onGenerateFilter()}>Поиск</Button>
                        {/*https://www.w3.org/Style/Examples/007/center.ru.html - позиционирование*/}
                    </div>
                </div>
                </div>
            <div>
            <div style={{height: "20px"}}>
            </div>
            {this.state.loadingTalons ? (
                    <Loader /> ) : ( 
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
                                
            </Table> )}   

                    {!this.state.loadingTalons && (<Pagination talonsPerPage={this.state.talonsPerPage} totalTalons={this.state.talons.length}
                        paginate={paginate} nextPage={nextPage} prevPage={prevPage} goToPage={ paginate }/>)}
            </div>
            </div>
        );
    }

    render(){   
        return (
        <div>
            {
                this.renderTalonsTable()
            }       
        </div>
        )
    }

    async populateTalons() {

        const response = await fetch(`talons?page=${this.state.currentPage}&itemsPerPage=${this.state.talonsPerPage}`);
        const data = await response.json();   
        this.setState({ talons: data, loadingTalons: false });
    }

    async populateFilterTalons(filterForTalons) {   
        console.log(`Goto populateFilterTalons`);     

        const response = await fetch(`talons/filter/?${filterForTalons}`);
        //const response = await fetch(`Talons/TalonsFilter`);
        const data = await response.json();   
        this.setState({ talons: data, loadingTalons: false });
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