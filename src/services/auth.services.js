import axios from "axios";

const apiurl = "http://localhost:8001/api/auth/";

class AuthService {
  // post username and password
  login(emailId, password) {
    return axios
      .post(apiurl + "signin", {
        emailId,
        password
      })
      .then(response => { // saves jwt to local storage
        if (response.data.accessToken) {
          console.log(response.data.accessToken);
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("token", JSON.stringify(response.data.token));
        }
        return response.data;
      });
  }
  // when logging out removes jwt from local storage
  logout() {
    localStorage.removeItem("user");
  }
  // post username email and password after registering account
  register(firstName,lastName,userName, emailId, password,phoneNo) {
    return axios.post(apiurl + "signup", {
        
        firstName,
        lastName,
        userName,
      emailId,
      password,
      phoneNo
    });
  }
  // gets user information and jwt from local storage
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  
}

export default new AuthService();