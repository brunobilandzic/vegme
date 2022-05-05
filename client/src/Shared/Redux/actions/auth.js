import axios from "axios"
import { FaMarsDouble } from "react-icons/fa"
import { LOGOUT, LOG_IN_THE_USER } from "../types"

const loadUser =  () => async dispatch => {
    let response = await axios.get("http://localhost:5000/auth/test", {withCredentials: true})
    dispatch({type: LOG_IN_THE_USER, payload: response.data})
}

const logout  =() => async dispatch => {
    console.log("logout")
    const response = await axios.get("http://localhost:5000/auth/logout", {withCredentials: true}) 

    dispatch({type: LOGOUT})
}

export {loadUser, logout}