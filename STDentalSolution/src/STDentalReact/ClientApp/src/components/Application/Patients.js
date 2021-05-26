import React, { Component } from 'react';
import { MenuAdministrator } from './MenuAdministrator';
import './Patients.css';
import Error from './Error';
import Loader from './Loader';
import PaginationControlled from './Pagination.component';
import { Table } from 'reactstrap';
import * as moment  from 'moment';
import TextField from '@material-ui/core/TextField';

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

    onSearchFIOPatient(evt) {
        (evt.target.value.length > 2) && (            
            this.populatePatients(this.state.currentPage, evt.target.value) 
        )

        this.populateCountPatients();
        this.populatePatients(this.state.currentPage); 
    }

    render() {
        const paginate = pageNum => { this.populatePatients(pageNum) };

        return(
            <div>
                <MenuAdministrator />                
                
                {/*<form>
                    <div class="form-group">
                        <input type="text" class="form-control" id="formGroupExampleInput" 
                            placeholder="Введите ФИО для поиска" style={{ width: "50%", left: "10%" }}/>
                    </div>
                </form> */}             

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
                                            <th>ФИО пациента</th>
                                            <th>Город</th>
                                            <th>Улица</th>
                                            <th>Телефон</th>
                                            <th>Дата рождения</th>
                                            <th>Национальность</th>
                                            <th>Комментарий</th>
                                        </tr>
                                    </thead>           
                                        <tbody>
                                            {this.state.patients.map((patient, index) =>
                                                <tr key={index} >
                                                    <td>{patient.name}</td>
                                                    <td>{patient.city}</td> 
                                                    <td>{patient.street}</td> 
                                                    <td>{patient.phone}</td> 
                                                    <td>{moment(patient.dateborn).format("DD.MM.YYYY")}</td> 
                                                    <td>{patient.nationality}</td> 
                                                    <td>{patient.description}</td>                                            
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
            //console.log(`filterRow == = ${filterRow}`);

            const response = await fetch(filterRow);
            const data = await response.json();   
            this.setState({ patients: data, loadingPatients: false, currentPage: page });
        }
        catch (error) {
            this.setState({ errorLoad: error });
        }
    }

    async populateCountPatients(filter=null) {
        
        let response;
        (!filter) ? response = await fetch('patients/count') :
            response = await fetch(`patients/count?${filter}`);

        const data = await response.json();
        this.setState({ patientsCount: data });
    }

}