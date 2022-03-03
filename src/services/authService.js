import axios from 'axios';
import { API_URL } from '../keys/Api';




export default new class authService {
    async login(username, password) {
        const response = await axios
            .post(API_URL + "login", {
                username,
                password
            });
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
            
        }
        return response.data;
      }

      logout() {
        localStorage.removeItem("user");
        window.location.reload();
      }
    
}
