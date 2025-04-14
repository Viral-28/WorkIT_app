export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    // checks local storage for user item
    if (user && user.accessToken) { // checks also for user jwt
      return { Authorization: 'Bearer ' + user.accessToken }; // returns http authorization header
    } else {
      return {}; // returns empty object 
    }
  }