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
        return response.status;
    };

    async editPatient(jsonTalon) {
        const response = await fetch(`patients`, 
        {
            method: 'PUT',
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
        return response.status;
    };

    async getPatients(page, perPage, filter=null){

        let response = !filter 
        ? await fetch(`patients?page=${page}&itemsPerPage=${perPage}`)
        : await fetch(`patients?page=${page}&itemsPerPage=${perPage}${filter}`);

        return await response.json();   
    };

    async getPatient(patientId){
        const response = await fetch(`patients/patient?patientId=${patientId}`);

        return await response.json();   
    }

    async delPatient(patientId){
        const response = await fetch(`patients?patientId=${patientId}`, 
        {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        });
        return response.status;
    }
    //------staffs-------------------
    async getDoctorNames() {
        const response = await fetch('staffs/doctorNames');
        return await response.json(); 
    };


    //------talons-------------------
    async getCountTalons(filter) {
        let response;
        (!filter) ? response = await fetch('talons/talonCount') :
            response = await fetch(`talons/talonCount?${filter}`);

        return await response.json();
    };

    async getTalonServices(talonId) {
        const response = await fetch(`talons/services?talonid=${talonId}`);
        return await response.json();
    } 

    async getTalon(talonId) {
        const response = await fetch(`talons/talon?talonid=${talonId}`);
        return await response.json(); 
    }

    async addTalon(jsonTalon) {
        const response = await fetch(`talons`, 
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

        return response.status; 
    }

    async deleteTalon(talonId) {
        const response = await fetch(`talons?talonid=${talonId}`, 
            {
                method: 'DELETE',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer'
            });
        return response.status;
    }

    async editTalon(jsonTalon) {
        const response = await fetch(`talons`, 
        {
            method: 'PUT',
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
        return response.status;
    }

    //------services-----------------
    async getServiceNames() {
        const response = await fetch('services/serviceNames');
        return await response.json();
    };

    async getActualServices() {
        const response = await fetch('services/actualServices');
        return await response.json();
    };

}





