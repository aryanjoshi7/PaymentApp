import axios from "axios"
import authHeader from "./auth-header";
const API_URL = "http://localhost:3000/api/";
class UserService {
    getPublicContent(){
        return axios(API_URL+"all");
    }
    getPage(page){
        return axios(API_URL+page,{headers:authHeader()})
    }
}
    
export default new UserService();