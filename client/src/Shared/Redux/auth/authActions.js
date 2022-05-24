import axios from "axios"
import { LOGOUT, LOG_IN_THE_USER } from "../types"

const loadUser =  () => async dispatch => {
    let response = await axios.get(process.env.REACT_APP_ROOT_URL + "auth/getuser", {withCredentials: true})
    dispatch({type: LOG_IN_THE_USER, payload: response.data})
}

const logout  =() => async dispatch => {
    const response = await axios.get(process.env.REACT_APP_ROOT_URL + "auth/logout", {withCredentials: true}) 

    dispatch({type: LOGOUT})
}

export {loadUser, logout}