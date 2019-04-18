import axios from "axios";

export default {

    saveUser:  function(userData) {
        console.log(userData)
        return axios.post("/api/register", userData);
      },
};