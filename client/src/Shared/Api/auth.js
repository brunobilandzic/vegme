import axios from "axios";

export const loadUserFromServer = async () => {
    let response = await axios.get(
        process.env.REACT_APP_ROOT_URL + "auth/getuser",
        { withCredentials: true }
      );

    return response?.data
}

export const logoutUserFromServer =  async () => {
    const response = await axios.get(
        process.env.REACT_APP_ROOT_URL + "auth/logout",
        { withCredentials: true }
      );
}