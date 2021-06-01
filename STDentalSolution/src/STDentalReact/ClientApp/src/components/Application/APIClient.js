export class ApiClient {

    //------patients-----------------
    async getPatientNames() {
        const response = await fetch('patients/patientNames');
        return await response.json();
    };

    async addPatient(jsonTalon) {
        const response = await fetch(`patients`, 
        {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: jsonTalon
        });
        return await response.json();
    };

    async getPatients(page, filter, perPage){
        let filterRow = `patients?page=${page}&itemsPerPage=${perPage}${filter}`.replace('null','');

        const response = await fetch(filterRow);
        return await response.json();   
    }
    //------staffs-------------------
    async getDoctorNames() {
        const response = await fetch('staffs/doctorNames');
        return await response.json(); 
    };


    //------talons-------------------
    async GetCountTalons(filter) {
        let response;
        (!filter) ? response = await fetch('talons/talonCount') :
            response = await fetch(`talons/talonCount?${filter}`);

        return await response.json();
    }

    //------services-----------------
    async GetServiceNames() {
        const response = await fetch('services/serviceNames');
        return await response.json();
    };

}





