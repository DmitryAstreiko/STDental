
export class ApiClient {

    async getPatientNames(){
    const response = await fetch('patients/combo');
    return await response.json();
    };

}





