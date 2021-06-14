import React, { Component } from 'react';
import { Table } from 'reactstrap';
import './Talons.css';
import ComboBox from './Combobox.component';
import Button from '@material-ui/core/Button';
import Loader from './Loader';
import DatePicker from './Picker.component';
import * as moment  from 'moment';
import Error from './Error';
import PaginationControlled from './Pagination.component';
import { green, purple} from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ContactlessOutlinedIcon from '@material-ui/icons/ContactlessOutlined';
import ContactsOutlinedIcon from '@material-ui/icons/ContactsOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import ViewTalonServices from './ViewTalonServices';
import {ApiClient} from './APIClient';
import {TalonCUD} from './TalonCUD';

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
            errorLoad: null,
            talonCreate: false,
            talonEdit: false,
            talonDelete: false,
            talonList: true,
            selectedTalonId: null,
            roleDoctor: false,
            roleAccountant: false,
            roleAdministrator: false,
        }

        this.apiClient = new ApiClient();

        this.onRowSelect = this.onRowSelect.bind(this);
        this.onClickPatient = this.onClickPatient.bind(this);
        this.onPatientSelect = this.onPatientSelect.bind(this);
    }

    componentDidMount() {        
        this.populatePatients();
        this.populateDoctors();
        if (this.props.doctorId) 
        {
            const doctorId = this.props.doctorId;
            this.setState({ selectedDoctorId: doctorId});

            let filter = `doctorid=${doctorId}`;
            this.populateTalons(1, `&${filter}`);   
            this.populateCountTalons(filter);
        }
        else 
        {
            this.populateTalons(this.state.currentPage, null);
            this.populateCountTalons();
        }

        (this.props.roleDoctor) && this.setState({ roleDoctor: true });
        (this.props.roleAdministrator) && this.setState({ roleAdministrator: true });
        (this.props.roleAccountant) && this.setState({ roleAccountant: true });
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

    onCreateTalon() {
        this.setState({ talonCreate: true });
        this.setState({ talonList: false });
        this.setState({ talonEdit: false });
        this.setState({ talonDelete: false });
        this.setState({ selectedTalonId: null });
    }

    onEditTalon(talonId) {
        this.setState({ talonList: false });
        this.setState({ talonCreate: false });
        this.setState({ talonEdit: true });
        this.setState({ talonDelete: false });
        this.setState({ selectedTalonId: talonId });
    }

    onDeleteTalon(talonId) {
        this.setState({ talonList: false });
        this.setState({ talonCreate: false });
        this.setState({ talonEdit: false });
        this.setState({ talonDelete: true });
        this.setState({ selectedTalonId: talonId });
    }

    payTalonServices(talonId) {

    }

    closePatientCUD(){
        this.setState({ talonCreate: false });
        this.setState({ talonList: true });
        this.setState({ talonEdit: false });
        this.setState({ talonDelete: false });
    }

    renderTalonsTable() {      
        const paginate = pageNum => { this.populateTalons(pageNum, this.state.filterTalons) };        

        return (
            <div>
                <div >
                    <div className={"d-flex justify-content-around"}>
                        <div className="col">
                            <ComboBox labelvalue={"Выберите пациента"} lists={this.state.patients} 
                                onSelected={ (value) => this.onPatientSelect(value) } nameid={"combopatient"} 
                                widthValue={300} />
                        </div>
                        {!this.state.roleDoctor && <div className="col">
                            <ComboBox labelvalue={"Выберите врача"} lists={this.state.doctors} 
                                onSelected={ (value) => this.onDoctorSelect(value) } nameid={"combodoctor"} 
                                widthValue={300} />
                        </div>
                        }
                        <div className="col">
                            <DatePicker labelvalue={"Начало периода"} onSelected={ (value) => this.onDateStartSelect(value) } />
                        </div>
                        <div className="col">
                            <DatePicker labelvalue={"Окончание периода"} onSelected={ (value) => this.onDateEndSelect(value) } />
                        </div>
                        <div className={"col"} style={{position: "relative"}}>
                            <Button 
                                style={{position: "absolute", top: "50%", transform: "translate(0, -50%)", color: purple[900]}} 
                                //variant="contained" 
                                variant="outlined"
                                size="medium"
                                startIcon={<SearchOutlinedIcon />}
                                onClick={ () => this.onGenerateFilter()}>Поиск</Button>
                        </div>
                        <div className={"col"} style={{position: "relative"}}>
                            <Button 
                                style={{position: "absolute", top: "50%", transform: "translate(0, -50%)", color: purple[900]}} 
                                //variant="contained" 
                                variant="outlined"
                                //color="secondary"
                                size="medium"
                                startIcon={<ContactsOutlinedIcon />}
                                onClick={ () => this.onCancelFilter()}>Сбросить</Button>                            
                        </div>
                        <div className={"col"} style={{position: "relative"}}> 
                        <Button
                            //variant="contained"
                            variant="outlined"
                            color="secondary"
                            size="medium"
                            style={{position: "absolute", top: "50%", transform: "translate(0, -50%)"}} 
                            startIcon={<ContactsOutlinedIcon />}
                            onClick={ () => (this.onCreateTalon()) }
                        >Создать талон</Button>
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
                                            <th></th>
                                            <th>ФИО пациента</th>
                                            <th>ФИО врача</th>
                                            <th>Стоимость</th>
                                            <th>Со скидкой</th>
                                            {this.state.roleAdministrator &&  <th></th>}
                                            <th>Дата талона</th>
                                            <th>Комментарий</th>
                                            {!this.state.roleAccountant && <th></th>}
                                            {this.state.roleAdministrator && <th></th>}
                                        </tr>
                                    </thead>           
                                        <tbody>
                                            {this.state.talons.map((talon, index) =>
                                                //<tr key={talon.talonId} className={talon.talonStatus} onClick={() => this.onRowSelect(talon)}>
                                                <tr key={talon.talonId} className={talon.talonStatus} >
                                                    <td>{talon.talonId}</td>
                                                    <td>
                                                        {/*<IconButton aria-label="delete" className={classes.margin}>*/}
                                                        <ViewTalonServices talonNumber={talon.talonId} patinetN={talon.patientName}/>
                                                    </td>
                                                    <td>{talon.patientName}</td>
                                                    <td>{talon.staffName}</td> 
                                                    <td>{talon.summa.toFixed(2)}</td>   
                                                    <td>{talon.cost.toFixed(2)}</td>
                                                    {this.state.roleAdministrator && <td>
                                                        <IconButton 
                                                            aria-label="pay" 
                                                            style={{ color: purple[500] }}
                                                            onClick={ () => (this.payTalonServices(talon.talonId)) }>
                                                            <ContactlessOutlinedIcon fontSize="small" />
                                                        </IconButton>
                                                    </td>
                                                    }
                                                    <td>{moment(talon.createDate).format('DD.MM.YYYY')}</td>
                                                    <td>{talon.description}</td> 
                                                    {!this.state.roleAccountant && 
                                                        <td>
                                                            {/*<IconButton aria-label="delete" className={classes.margin}>*/}
                                                            <IconButton 
                                                                aria-label="edit" 
                                                                style={{ color: green[500] }}
                                                                onClick={ () => (this.onEditTalon(talon.talonId)) }>
                                                                <EditIcon fontSize="small" />
                                                            </IconButton>
                                                        </td>  
                                                    }                                                
                                                    {this.state.roleAdministrator && 
                                                        <td>                                                        
                                                            <IconButton 
                                                                aria-label="delete" 
                                                                color="secondary"
                                                                onClick={ () => (this.onDeleteTalon(talon.talonId)) }>
                                                                <DeleteIcon fontSize="small" />
                                                            </IconButton>
                                                        </td>  
                                                    }                                         
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
        const closingPatient = () => { this.closePatientCUD() };  
        const countTalon = () => { this.populateCountTalons() };
        const getTalons = () => { this.populateTalons(1) }
        return (
        <div>
            {this.state.talonList && this.renderTalonsTable()}
            {this.state.talonCreate && <TalonCUD flagTalonCreate={true} flagTalonEdit={false} flagTalonDelete={false} 
                closingPatient={ closingPatient } countTalon={ countTalon } getTalons={ getTalons } 
                vabelButtonSave={"Сохранить талон"} labelAction={"Добавление нового талона"} />}
            {this.state.talonEdit && <TalonCUD flagTalonCreate={false} flagTalonEdit={true} flagTalonDelete={false} 
                talonId={this.state.selectedTalonId} closingPatient={ closingPatient } countTalon={ countTalon } getTalons={ getTalons }
                vabelButtonSave={"Изменить талон"} labelAction={`Редактирование талона № ${this.state.selectedTalonId}`} />}
            {this.state.talonDelete && <TalonCUD flagTalonCreate={false} flagTalonEdit={false} flagTalonDelete={true} 
                talonId={this.state.selectedTalonId} closingPatient={ closingPatient } countTalon={ countTalon } getTalons={ getTalons }
                vabelButtonSave={"Удалить талон"} labelAction={`Удаление талона № ${this.state.selectedTalonId}`}/>}
        </div>
        )
    }

    async populateTalons(page, filter=null) {
        try{
            let filterRow = `talons?page=${page}&itemsPerPage=${this.state.talonsPerPage}${filter}`.replace('null','');
            const response = await fetch(filterRow);
            const data = await response.json();   
            this.setState({ talons: data, loadingTalons: false, currentPage: page });
        }
        catch (error) {
            this.setState({ errorLoad: error });
        }
    }

    async populatePatients() {        
        const res = await this.apiClient.getPatientNames(); 
        this.setState({ patients: res });
    }
    
    async populateDoctors() {        
        const res = await this.apiClient.getDoctorNames();
        this.setState({ doctors: res });
    }

    async populateCountTalons(filter=null) {       
        const res = await this.apiClient.getCountTalons(filter);
        this.setState({ talonsCount: res });
    }    

    async populateTalonServices(talonId) {       
        const response = await fetch(`talons/services?talonid=${talonId}`);
        const data = await response.json();   
        this.setState({ services: data });
    }
}