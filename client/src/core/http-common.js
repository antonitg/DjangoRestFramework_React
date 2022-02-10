import axios from "axios";

const httpClient = axios.create({
    // baseURL: "http://localhost:8000/api"
    baseURL: "http://127.0.0.1:8000/api"
    
})

if (localStorage.getItem("jwt")) {
    httpClient.defaults.headers.common['Authorization'] = `Bearer ` + localStorage.getItem("jwt"); // for all requests
}

const ApiService = {

    get(path) {
        return httpClient.get(path)
        .catch((error) => {throw error})
    },
    getNoError(path){
        return httpClient.get(path).catch(function (error) {return error})
    },
    post(path, body) {
        return httpClient.post(path, body)
        .catch((error) => {throw error})
    },
    put(path, body) {
        return httpClient.put(path, body)
        .catch((error) => {throw error})

    },
    patch(path, body) {
        return httpClient.patch(path, body)
        .catch((error) => {throw error})

    },
    delete(path) {
        return httpClient.delete(path)
        .catch((error) => {throw error})

    }
}
export default ApiService
