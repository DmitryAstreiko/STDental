import React, { Component } from 'react'
import { Table } from 'reactstrap';
import './Talons.css';
import ComboBox from './Combobox.component';
import Button from '@material-ui/core/Button';
import Loader from './Loader';
import { MenuAdministrator } from './MenuAdministrator';
//import Pagination from './Pagination';
import DatePicker from './Picker.component';
import * as moment  from 'moment';
import Error from './Error';
import PaginationControlled from './Pagination.component';
import { green } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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
            selectedStartDate: moment(new Date()).format('YYYY-MM-DD'),
            selectedEndDate: moment(new Date()).format('YYYY-MM-DD'),
            currentPage: 1,
            talonsPerPage: 20,
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

    deleteRowTalon(talonId) {
        try {
            let www = this.deleteTalon(talonId);

            console.log(www);

            (www === true) ? (
                //this.populateCountTalons(),
                this.populateTalons(1)            
            ) : (
                alert(`Талон №${talonId} не может быть удален!`)
            )

            this.populateCountTalons();
        } catch {
            alert("Ошибка удаления талона!")
        }
        
    }

    onPatientSelect = value => {
        this.setState({ selectedPatientId: value && value.id })
    }

    onDoctorSelect = value => {
        this.setState({ selectedDoctorId: value && value.id })
    }

    onDateStartSelect = value => {
        //const result = new Date(value);
        //let res = Date.parse(value)
        let res = moment(value).format('YYYY-MM-DD')
        this.setState({ selectedStartDate: res })
    }

    onDateEndSelect = value => {
        let res = moment(value).format('YYYY-MM-DD')
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

        let filter = `${filterPatient}${filterDoctor}${filterStartDate}${filterEndDate}`.replace('null','').replace('null','');

        this.setState({ filterTalons:  filter });

        this.populateCountTalons(filter);
        this.populateTalons(1, filter);
    }

    onCancelFilter() {     
        //clear combobox and state current date to datepicker
        this.setState({ filterTalons: null });
            
        this.populateCountTalons();
        this.populateTalons(1);
    }

    renderTalonsTable() {      
        const paginate = pageNum => { this.populateTalons(pageNum, this.state.filterTalons) };

        return (
            <div>
                <MenuAdministrator />
                {/*<div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="valueshow" style={{ margin: "10px" }}>Выбран талон: </span>
                    </div>
                        <input type="text" value={this.state.selectedTalon.talonId ? `№ ${this.state.selectedTalon.talonId}` : ``} 
                            style={{ width: "110px", textAlign: "center", margin: "10px" }} readOnly />                        
                        <input type="text" value={this.state.selectedTalon.talonId ? `Пациент - ${this.state.selectedTalon.patientName}` : ``} 
                            style={{ width: "350px", textAlign: "center", margin: "10px" }} readOnly />
                        <input type="text" value={this.state.selectedTalon.talonId ? `Врач - ${this.state.selectedTalon.staffName}` : ``} 
                            style={{ width: "350px", textAlign: "center", margin: "10px" }} readOnly />
                        <input type="text" value={this.state.selectedTalon.talonId ? `Дата талона - ${moment(this.state.selectedTalon.createDate).format("DD.MM.YYYY")}` : ``} 
                            style={{ width: "250px", textAlign: "center", margin: "10px" }} readOnly />
                        <input type="text" value={this.state.selectedTalon.talonId ? `Итого по талону - ${this.state.selectedTalon.cost}` : ``} 
                            style={{ width: "300px", textAlign: "center", margin: "10px" }} readOnly />
                </div> 
                <div style={{height: "20px"}}>
                </div>*/}
                <div >
                    <div className={"d-flex justify-content-around"}>
                        <div className="col">
                            <ComboBox labelvalue={"Выберите пациента"} lists={this.state.patients} 
                                onSelected={ (value) => this.onPatientSelect(value) } nameid={"combopatient"} 
                                widthValue={300} />
                        </div>
                        <div className="col">
                            <ComboBox labelvalue={"Выберите врача"} lists={this.state.doctors} 
                                onSelected={ (value) => this.onDoctorSelect(value) } nameid={"combodoctor"} 
                                widthValue={300} />
                        </div>
                        <div className="col">
                            <DatePicker labelvalue={"Начало периода"} onSelected={ (value) => this.onDateStartSelect(value) } />
                        </div>
                        <div className="col">
                            <DatePicker labelvalue={"Окончание периода"} onSelected={ (value) => this.onDateEndSelect(value) } />
                        </div>
                        <div className={"col"} style={{position: "relative"}}>
                            <Button style={{position: "absolute", top: "50%", transform: "translate(0, -50%)"}} 
                                variant="contained" onClick={ () => this.onGenerateFilter()}>Поиск</Button>
                            {/*https://www.w3.org/Style/Examples/007/center.ru.html - позиционирование*/}
                        </div>
                        <div className={"col"} style={{position: "relative"}}>
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
                            (this.state.talons.length === 0) ? (
                                //<NotInfo /> ) : 
                                <div className="d-flex justify-content-center">
                                    <h1 style={{ color: "red" }}>Нет информации для отображения</h1>
                                </div> 
                                ) :
                                (<Table className='table' aria-labelledby="tabelLabel">
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
                                            <th></th>
                                        </tr>
                                    </thead>           
                                        <tbody>
                                            {this.state.talons.map((talon, index) =>
                                                //<tr key={talon.talonId} className={talon.talonStatus} onClick={() => this.onRowSelect(talon)}>
                                                <tr key={talon.talonId} className={talon.talonStatus} >
                                                    <td>{talon.talonId}</td>
                                                    <td>{talon.patientName}</td>
                                                    <td>{talon.staffName}</td> 
                                                    <td>{talon.summa.toFixed(2)}</td>   
                                                    <td>{talon.cost.toFixed(2)}</td>
                                                    <td>{moment(talon.createDate).format('DD.MM.YYYY')}</td>
                                                    <td>{talon.description}</td> 
                                                    <td>
                                                        <Button
                                                            //variant="contained"
                                                            variant="outlined"
                                                            //color="secondary"
                                                            style={{ color: green[500] }}
                                                            size="small"
                                                            //className={classes.button}
                                                            startIcon={<EditIcon />}
                                                            height="15px"
                                                            keyedit={talon.talonId} 
                                                            onClick={ () => (this.editRowTalon(talon.talonId)) }
                                                        ></Button>
                                                    </td>  
                                                    <td>
                                                        <Button
                                                            //variant="contained"
                                                            variant="outlined"
                                                            color="secondary"
                                                            size="small"
                                                            //className={classes.button}
                                                            startIcon={<DeleteIcon />}
                                                            height="15px"
                                                            keydel={talon.talonId} 
                                                            onClick={ () => (this.deleteRowTalon(talon.talonId)) }
                                                        ></Button>
                                                    </td>                                           
                                                </tr>
                                            )}
                                        </tbody>                  
                                </Table> 
                                )
                        )
                    )
                }   

                    {/* {!this.state.loadingTalons && !!this.state.talonsCount && (<Pagination talonsPerPage={this.state.talonsPerPage} totalTalons={this.state.talonsCount}
                        paginate={ paginate } nextPage={ nextPage } prevPage={ prevPage } currentPage={this.state.currentPage} />)
                    }*/}

                    {!(this.state.talons.length === 0) && !this.state.loadingTalons && !!this.state.talonsCount && (
                        <div className="row">
                            <div className={"d-flex justify-content-center"} style={{width: "350px"}} >Записей на странице: {this.state.talons.length}</div>
                            <div className="col" >
                                <PaginationControlled infoPerPage={this.state.talonsPerPage} 
                                    totalInfo={this.state.talonsCount} paginate={ paginate } currentPage={this.state.currentPage} />                                
                            </div>
                            <div className={"d-flex justify-content-center"} style={{width: "350px"}} >Всего записей: {this.state.talonsCount}</div>
                        </div>
                    )}
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
            let filterRow = `talons?page=${page}&itemsPerPage=${this.state.talonsPerPage}${filter}`.replace('null','');
            //console.log(`filterRow == = ${filterRow}`);

            const response = await fetch(filterRow);
            const data = await response.json();   
            this.setState({ talons: data, loadingTalons: false, currentPage: page });
        }
        catch (error) {
            this.setState({ errorLoad: error });
        }
    }

    async populatePatients() {        
        const response = await fetch('patients/combo');
        const data = await response.json();   
        this.setState({ patients: data });
    }
    
    async populateDoctors() {        
        const response = await fetch('staffs');
        const data = await response.json();   
        this.setState({ doctors: data });
    }

    async populateCountTalons(filter=null) {
        
        let response;
        (!filter) ? response = await fetch('talons/count') :
            response = await fetch(`talons/count?${filter}`);

        const data = await response.json();
        this.setState({ talonsCount: data });
    }

    async deleteTalon(talonId) {
        const response = await fetch(`talons/delete?talonid=${talonId}`, 
        {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            //body: jsonTalon
        });

        //const response = await fetch(`talons/delete?talonid=${talonId}`);

        return await response.data;
    }
}