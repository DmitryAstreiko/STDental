import axios from "axios";

class AuthService {
  login(username, password) {
    return axios
      .post("staffs/signin", {
        username,
        password
      })
      .then(response => {
        localStorage.setItem("userNameDental", JSON.stringify(response.data.user));
        localStorage.setItem("userRoleDental", JSON.stringify(response.data.role));
        localStorage.setItem("userIdDental", JSON.stringify(response.data.id));
        {/*if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log(`response.data = ${response.data}`);
        } */}       

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("userNameDental");
    localStorage.removeItem("userRoleDental");
    localStorage.removeItem("userIdDental");
  }

  register(username, email, password) {
    return axios.post("staffs/signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    const resName = (localStorage.getItem('userNameDental') === 'undefined') ? null : localStorage.getItem('userNameDental'); 
    //return JSON.parse(localStorage.getItem('userNameDental'));;
    return JSON.parse(resName);
  }

  getCurrentRole() {
    return JSON.parse(localStorage.getItem('userRoleDental'));
  }

  getCurrentStaffId() {
    return JSON.parse(localStorage.getItem('userIdDental'));
  }

  getFlagAutorization() {
    if (localStorage.getItem('userNameDental') !== null) return true
    else return false;
    
  }
}

export default new AuthService();
