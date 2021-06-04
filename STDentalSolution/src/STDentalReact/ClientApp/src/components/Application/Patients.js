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
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import IconButton from '@material-ui/core/IconButton';
import PatientCRUD from './PatientCRUD';
import { ApiClient } from './APIClient';
//import { ThemeProvider } from '@material-ui/styles';

//import { makeStyles } from '@material-ui/core/styles';

/*useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));*/

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
            patientsCount: null,
            patientInsert: false,
            patientEdit: false,
            patientDelete: false,
            selectedPatientId: null
        }

        this.apiClient = new ApiClient();
    }

    componentDidMount() {
        this.populateCountPatients();
        this.populatePatients(this.state.currentPage, this.state.patientsPerPage);      
    } 

    onSearchFIOPatient(event) {

        let fioSearch = `&fiosearch=${event.target.value}`;
        
        this.populatePatients(1, this.state.patientsPerPage, fioSearch);
        this.populateCountPatients(fioSearch);              
    }

    async deleteRowPatient(patientId) {
        try {

            let res = await this.deletePatient(patientId); 
            console.log(res);
            if(res === 200) alert(`Пациент №${patientId} удален!`);

            if(res === 400) alert("Пациент для удаления не найден!");

            if(res === 405) alert("Ошибка. Method Not Allowed!");

            this.populatePatients(this.state.currentPage, this.state.patientsPerPage);        
            this.populateCountPatients();

        } catch {
            alert("Ошибка удаления пациента!");
        }
    }

    onInsertPatient(){
        this.setState({ patientInsert: true });
        this.setState({ patientEdit: false });
        this.setState({ patientDelete: false });
    }

    onEditPatient(patientId){
        this.setState({ selectedPatientId: patientId });
        this.setState({ patientEdit: true });
        this.setState({ patientInsert: false });
        this.setState({ patientDelete: false });           
    }

    onDeletePatient(patientId){
        this.setState({ selectedPatientId: patientId });
        this.setState({ patientEdit: false });
        this.setState({ patientInsert: false });
        this.setState({ patientDelete: true });          
    }

    closePatient(){
        this.setState({ patientInsert: false });
        this.setState({ patientEdit: false });
        this.setState({ patientDelete: false });
    }

    render() {
        const paginate = pageNum => { this.populatePatients(pageNum, this.state.patientsPerPage) };
        const changeState = () => { this.closePatient() };
        const selectCountPatients = () => { this.populateCountPatients() };
        const selectPatients = () => { this.populatePatients(1, this.state.patientsPerPage) };

        return(
            <div>
                <MenuAdministrator />

                <div className={"d-flex justify-content-around"}>
                    <div >
                        <div>
                        <TextField id="outlined-basic" label="Введите ФИО для поиска (не менее 3 символов)" variant="outlined" 
                            style={{ width: "600px", marginBottom: "20px" }}
                            onChange={(event) => this.onSearchFIOPatient(event)} />
                        </div>

                        {this.state.patientInsert && <PatientCRUD visibleModal={true} changeState={ changeState } valueForm={"Добавление пациента"} 
                            operationInsert={true} operationEdit={false} operationDelete={false} selectCountPatients={ selectCountPatients } 
                            selectPatients={ selectPatients } selectedPatientId={null}
                            />
                        }

                        {this.state.patientEdit && <PatientCRUD visibleModal={true} changeState={ changeState } valueForm={"Редактирование пациента"} 
                            operationInsert={false} operationEdit={true} operationDelete={false} selectCountPatients={ selectCountPatients } 
                            selectPatients={ selectPatients } selectedPatientId={this.state.selectedPatientId}/>
                        }

                        {this.state.patientDelete && <PatientCRUD visibleModal={true} changeState={ changeState } valueForm={"Удаление пациента"} 
                            operationInsert={false} operationEdit={false} operationDelete={true} selectCountPatients={ selectCountPatients } 
                            selectPatients={ selectPatients } selectedPatientId={this.state.selectedPatientId}/>
                        }

                    </div>                        

                    <div style={{position: "relative", width: "200px"}}>
                        <Button
                            //variant="contained"
                            variant="outlined"
                            color="secondary"
                            size="small"
                            style={{ position: "absolute", top: "35%", transform: "translate(0, -50%)" }}
                            //className={classes.button}
                            startIcon={<PersonAddOutlinedIcon />}
                            onClick={() => this.onInsertPatient()}>
                        Добавить пациента</Button>
                    </div>
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
                                            <th>Электронный ящик</th>
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
                                                    <td>{moment(patient.dateBorn).format("DD.MM.YYYY")}</td> 
                                                    <td>{(patient.nationality === "BY") ? ('Республика Беларусь') : ('Иностранное государство')}</td> 
                                                    <td>{patient.email}</td>
                                                    <td>{patient.description}</td> 
                                                    <td>
                                                        {/*<IconButton aria-label="delete" className={classes.margin}>*/}
                                                        <IconButton 
                                                            aria-label="edit" 
                                                            style={{ color: green[500] }}
                                                            onClick={ () => (this.onEditPatient(patient.id)) }>
                                                            <EditIcon fontSize="small" />
                                                        </IconButton>
                                                    </td>
                                                    <td>
                                                        {/*<IconButton aria-label="delete" className={classes.margin}>*/}
                                                        <IconButton 
                                                            aria-label="delete" 
                                                            color="secondary"
                                                            //onClick={ () => (this.deletePatient(patient.id)) }>
                                                            onClick={ () => (this.onDeletePatient(patient.id)) }>
                                                            <DeleteIcon fontSize="small" />
                                                        </IconButton>
                                                    </td>                                       
                                                </tr>
                                            )}
                                        </tbody>                  
                                </Table> 
                                )
                        )
                    )                    
                } 

                {!(this.state.patients.length === 0) && !this.state.loadingPatients && !!this.state.patientsCount && (
                    <div className="row">
                        <div className={"d-flex justify-content-center"} style={{width: "350px"}} >Записей на странице: {this.state.patients.length}</div>
                        <div className="col" >
                            <PaginationControlled infoPerPage={this.state.patientsPerPage} 
                                totalInfo={this.state.patientsCount} paginate={ paginate } currentPage={this.state.currentPage} />                            
                        </div>
                        <div className={"d-flex justify-content-center"} style={{width: "350px"}} >Всего записей: {this.state.patientsCount}</div>
                    </div>
                )}                                
            </div>
        )
    }

    async populatePatients(page, perPage, filter=null) {       
        let response =!filter 
            ? await fetch(`patients?page=${page}&itemsPerPage=${perPage}`)
            : await fetch(`patients?page=${page}&itemsPerPage=${perPage}${filter}`);

        const res = await response.json(); 
        
        //const res = this.apiClient.getPatients(page, perPage, filter);

        this.setState({ patients: res, loadingPatients: false, currentPage: page });
    }

    async populateCountPatients(filter=null) {
        let response;
        (!filter) ? response = await fetch('patients/count') :
            response = await fetch(`patients/count?${filter}`);

        const data = await response.json();
        this.setState({ patientsCount: data });
    }
}