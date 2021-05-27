import React, { Component } from 'react';
import { MenuAdministrator } from './MenuAdministrator';
import './Patients.css';
import Error from './Error';
import Loader from './Loader';
import PaginationControlled from './Pagination.component';
import { Table } from 'reactstrap';
import * as moment  from 'moment';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';

export default class Patients extends Component{

    constructor(props){
        super(props);

        this.state = {
            patients: [],
            loadingPatients: true,
            currentPage: 1,
            patientsPerPage: 20,
            inputFIO: null,
            inputStreet: null,
            inputCity: null,
            inputDateBorn: null,
            inputNationality: null,
            imputPhone: null,
            patientsCount: null
        }
    }

    componentDidMount() {
        this.populateCountPatients();
        this.populatePatients(this.state.currentPage);      
    } 

    onSearchFIOPatient(event) {

        let fioSearch = `&fiosearch=${event.target.value}`;
        
        this.populatePatients(1, fioSearch);
        this.populateCountPatients(fioSearch);

        /*!(inputText) ? 
        (
            this.populatePatients(this.state.currentPage, fioSearch),
            this.populateCountPatients(fioSearch)
        ) : 
        (
            this.populatePatients(this.state.currentPage),
            this.populateCountPatients()
        ) */               
    }

    deleteRowPatient = value => {
        /*let rows = this.state.tableServices;

        rows.splice(value, 1); 
        this.setState({tableServices: rows});

        this.CountCostAllTalons();*/
    }

    editRowPatient = value => {
        /*let rows = this.state.tableServices;

        rows.splice(value, 1); 
        this.setState({tableServices: rows});

        this.CountCostAllTalons();*/
    }

    render() {
        const paginate = pageNum => { this.populatePatients(pageNum) };

        return(
            <div>
                <MenuAdministrator />                

                <div>
                    <TextField id="outlined-basic" label="Введите ФИО для поиска (не менее 3 символов)" variant="outlined" 
                        style={{ width: "600px", marginBottom: "20px", left: "50px" }}
                        onChange={(event) => this.onSearchFIOPatient(event)} />
                </div>

                {this.state.loadingPatients ? (
                    <Loader /> ) : 
                    (
                    (this.state.errorLoad) ? (
                        <Error /> ) :
                        (
                            (this.state.patients.length === 0) ? (
                                //<NotInfo /> ) : 
                                <div className="d-flex justify-content-center">
                                    <h1 style={{ color: "red" }}>Нет информации для отображения</h1>
                                </div> 
                                ) :
                                (<Table className='table' aria-labelledby="tabelLabel">
                                    <thead>
                                        <tr>
                                            <th>№ п.п.</th>
                                            <th>ФИО пациента</th>
                                            <th>Город</th>
                                            <th>Улица</th>
                                            <th>Телефон</th>
                                            <th>Дата рождения</th>
                                            <th>Национальность</th>
                                            <th>Комментарий</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>           
                                        <tbody>
                                            {this.state.patients.map((patient, index) =>
                                                <tr key={index} >
                                                    <td>{index + 1}</td>
                                                    <td>{patient.name}</td>
                                                    <td>{patient.city}</td> 
                                                    <td>{patient.street}</td> 
                                                    <td>{patient.phone}</td> 
                                                    <td>{moment(patient.dateborn).format("DD.MM.YYYY")}</td> 
                                                    <td>{(patient.nationality === "BY") ? ('Республика Беларусь') : ('Иное')}</td> 
                                                    <td>{patient.description}</td> 
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
                                                            keyedit={index} 
                                                            onClick={ () => (this.editRowPatient(index)) }
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
                                                            keydel={index} 
                                                            onClick={ () => (this.deleteRowPatient(index)) }
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

                {/*{(this.state.patients.length === 0) && (!this.state.loadingPatients) && !!this.state.patientsCount && (*/}

                    <div className="row">
                        <div className={"d-flex justify-content-center"} style={{width: "350px"}} >Записей на странице: {this.state.patients.length}</div>
                        <div className="col" >
                            <PaginationControlled infoPerPage={this.state.patientsPerPage} 
                                totalInfo={this.state.patientsCount} paginate={ paginate } currentPage={this.state.currentPage} />                            
                        </div>
                        <div className={"d-flex justify-content-center"} style={{width: "350px"}} >Всего записей: {this.state.patientsCount}</div>
                    </div>
                
                {/*)}*/}                
            </div>
        )
    }

    async populatePatients(page, filter=null) {
        try{
            let filterRow = `patients?page=${page}&itemsPerPage=${this.state.patientsPerPage}${filter}`.replace('null','');

            const response = await fetch(filterRow);
            const data = await response.json();   
            this.setState({ patients: data, loadingPatients: false, currentPage: page });
        }
        catch (error) {
            this.setState({ errorLoad: error });
        }
    }

    async populateCountPatients(filter=null) {
        console.log(filter)
        let response;
        (!filter) ? response = await fetch('patients/count') :
            response = await fetch(`patients/count?${filter}`);

        const data = await response.json();
        this.setState({ patientsCount: data });
    }
}