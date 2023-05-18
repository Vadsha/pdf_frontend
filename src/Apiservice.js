import axios from "axios";
import TokenService from "./TokenService";
class ApiService {
    static setConfig () {
            this.token = TokenService.getToken(),
            this.baseUrl = `http://localhost:8000/api/admin/`;
            this.config = {
                  headers : {'Authorization' : `Bearer ${this.token}`}
        };
      }
    static get (url) {
        this.setConfig();
        return axios.get(this.baseUrl + url , this.config)
    }
    static post (url,data) {
        this.setConfig();
        return axios.post(this.baseUrl + url ,data, this.config)
    }
    static put (url,data) {
      this.setConfig();
      return axios.put(this.baseUrl + url , data,this.config)
  }
    static patch (url,data) {
        this.setConfig();
        return axios.patch(this.baseUrl + url , data,this.config)
    }
    static delete (url) {
        this.setConfig();
        return axios.delete(this.baseUrl + url , this.config)
    }
}

export default ApiService