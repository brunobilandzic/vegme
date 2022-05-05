import axios from "axios"
import { LOG_IN_THE_USER } from "../types"

const loadUser =  () => async dispatch => {
    let response = await axios.get("http://localhost:5000/auth/test", {withCredentials: true})
console.log(response)
    dispatch({type: LOG_IN_THE_USER, payload: response.data})
}

export  {loadUser}