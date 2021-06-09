import axios from "axios";

//const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post("talons/signin", {
        username,
        password
      })
      .then(response => {
        localStorage.setItem("username", JSON.stringify(response.data.user));

        {/*if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log(`response.data = ${response.data}`);
        } */}       

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("username");
  }

  register(username, email, password) {
    return axios.post("talons/signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('username'));;
  }
}

export default new AuthService();
