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
import Error from './Error';

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
            selectedStartDate: moment(new Date()).format('DD.MM.YYYY'),
            selectedEndDate: moment(new Date()).format('DD.MM.YYYY'),
            currentPage: 1,
            talonsPerPage: 15,
            talonsCount: null,
            filterTalons: null,
            errorLoad: null
        }

        this.onRowSelect = this.onRowSelect.bind(this);
        this.onClickPatient = this.onClickPatient.bind(this);
        this.onPatientSelect = this.onPatientSelect.bind(this);
    }

    componentDidMount() {
        this.populateCountTalons();
        this.populatePatients();
        this.populateDoctors();
        this.populateTalons(this.state.currentPage, null);        
    } 

    onRowSelect = row => (
        this.setState({selectedTalon: row && row})
    )

    onPatientSelect = value => {
        this.setState({ selectedPatientId: value && value.id })
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
        let filterPatient = this.state.selectedPatientId && `&patientid=${this.state.selectedPatientId}`;
        let filterDoctor = this.state.selectedDoctorId && `&doctorid=${this.state.selectedDoctorId}`;
        let filterStartDate = this.state.selectedStartDate && `&startdate=${this.state.selectedStartDate}`;
        let filterEndDate = this.state.selectedEndDate && `&enddate=${this.state.selectedEndDate}`;

        console.log(`filterPatient = ${filterPatient}`);
        console.log(`filterDoctor = ${filterDoctor}`);
        console.log(`filterStartDate = ${filterStartDate}`);
        console.log(`filterEndDate = ${filterEndDate}`);

        let filter = `${filterPatient}${filterDoctor}${filterStartDate}${filterEndDate}`.replace('&null','');

        console.log(`filter = ${filter}`);

        this.setState({ filterTalons:  filter });

        this.populateTalons(1, filter);
    }

    onCancelFilter() {     
        //clear combobox and state current date to datepicker

        this.populateTalons(1);
    }

    renderTalonsTable() {      
        //const indexOfLastTalon = this.state.currentPage * this.state.talonsPerPage;
        //const indexOfFirstTalon = indexOfLastTalon - this.state.talonsPerPage;
        //const currentTalons = this.state.talonsCount.slice(indexOfFirstTalon, indexOfLastTalon);
       // const currentTalons = this.state.talons;

        const paginate = pageNum => { this.populateTalons(pageNum, this.state.filterTalons) };

        const nextPage = () => { this.populateTalons(this.state.currentPage + 1, this.state.filterTalons) };

        const prevPage = () => { this.populateTalons(this.state.currentPage - 1, this.state.filterTalons) };

        //this.populateTalons();

        return (
            <div>
                <MenuAdministrator />
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
                                onSelected={ (value) => this.onPatientSelect(value) } nameid={"combopatient"} 
                                widthValue={300} />
                        </div>
                        <div className="col-sm">
                            <ComboBox labelvalue={"Выберите врача"} fios={this.state.doctors} 
                                onSelected={ (value) => this.onDoctorSelect(value) } nameid={"combodoctor"} 
                                widthValue={300}/>
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
                        <div className="col-sm" style={{position: "relative"}}>
                            <Button style={{position: "absolute", top: "50%", transform: "translate(0, -50%)"}} 
                                variant="contained" onClick={ () => this.onCancelFilter()}>Сбросить</Button>                            
                        </div>
                                </div>
                    </div>
                <div>
                <div style={{height: "20px"}}>
                </div>
                {this.state.loadingTalons ? (
                    <Loader /> ) : 
                    (
                    (this.state.errorLoad) ? (
                        <Error /> ) :
                        (
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
                                    <th></th>
                                </tr>
                            </thead>           
                                <tbody>
                                    {this.state.talons.map(talon =>
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
                        )
                    )
                }   

                    {!this.state.loadingTalons && (<Pagination talonsPerPage={this.state.talonsPerPage} totalTalons={this.state.talonsCount}
                        paginate={ paginate } nextPage={ nextPage } prevPage={ prevPage } />)
                    }
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

    async populateTalons(page, filter=null) {
        try{
        
            //console.log(`filterTalons = ${this.state.filterTalons}`);

            //let filterRow = `talons?page=${this.state.currentPage}&itemsPerPage=${this.state.talonsPerPage}`;

            //console.log(`filterRow = ${filterRow}`);
            let filterRow = `talons?page=${page}&itemsPerPage=${this.state.talonsPerPage}${filter}`.replace('null','');
            //console.log(`filterRow == = ${filterRow}`);

            const response = await fetch(filterRow);
            const data = await response.json();   
            this.setState({ talons: data, loadingTalons: false, currentPage: page });
        }
        catch (error) {
            this.setState({ errorLoad });
        }
    }

    /*async populateFilterTalons() {     
        const response = await fetch(`talons/filter/?${this.state.filterTalons}`);
        const data = await response.json();   
        this.setState({ talons: data, loadingTalons: false });
    }*/

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

    async populateCountTalons() {
        const response = await fetch('talons/count');
        const data = await response.json();
        this.setState({ talonsCount: data });
    }
}