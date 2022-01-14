import axios from "axios";

//  const httpClient = axios.create({
//   baseURL: "http://localhost:8000/api",
//   headers: {
//     "Content-type": "application/json",
//     "Access-Control-Allow-Origin": "*"
//   }
// });
// if (localStorage.getItem("jwt")) {
//     httpClient.defaults.headers.common['Authorization'] = `Bearer ` + localStorage.getItem("jwt"); // for all requests
// }
// export httpClient

const httpClient = axios.create({
    baseURL: "http://localhost:8000/api"
})

if (localStorage.getItem("jwt")) {
    httpClient.defaults.headers.common['Authorization'] = `Bearer ` + localStorage.getItem("jwt"); // for all requests
}

const ApiService = {

    get(path) {
        return httpClient.get(path)
    },
    post(path, body) {
        return httpClient.post(path, body)
    },
    put(path, body) {
        return httpClient.put(path, body)
    },
    patch(path, body) {
        return httpClient.patch(path, body)
    },
    delete(path) {
        return httpClient.delete(path)
    }
}
export default ApiService
