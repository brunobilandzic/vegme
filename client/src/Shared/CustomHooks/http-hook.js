const axios = require("axios");
const { useCallback, useState } = require("react");

const useHttpClient = () => {
  const [error, setError] = useState();
  const clearError = () => setError();
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      let response;
      try {
        switch (method) {
          case "GET":
            response = await axios.get(url, { headers: headers, withCredentials: true});
            break;
          case "POST":
            response = await axios.post(url, body, {withCredentials: true});
            break;
        }
      } catch (error) {
        setError(error.response.data.message);
      }
      

      return response.data;
    },
    []
  );

  return [sendRequest, error, clearError];
};

module.exports = { useHttpClient };
