import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080",
    // headers: {
    //     Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,
    // },
});

export default instance;
