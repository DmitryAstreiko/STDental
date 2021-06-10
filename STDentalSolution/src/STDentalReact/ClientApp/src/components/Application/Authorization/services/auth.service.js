import axios from "axios";

class AuthService {
  login(username, password) {
    return axios
      .post("talons/signin", {
        username,
        password
      })
      .then(response => {
        localStorage.setItem("userNameDental", JSON.stringify(response.data.user));
        localStorage.setItem("userRoleDental", JSON.stringify(response.data.role));

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
  }

  register(username, email, password) {
    return axios.post("talons/signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('userNameDental'));;
  }

  getCurrentRole() {
    return JSON.parse(localStorage.getItem('userRoleDental'));;
  }
}

export default new AuthService();
