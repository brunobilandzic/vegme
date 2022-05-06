import React from "react";
import { useHttpClient } from "./http-hook";

export default function OperatorCustomersLookup() {
  const [sendRequest, error, clearError, setError] = useHttpClient();
  useEffect(() => {
    let response;
  }, []);

  return <div>OperatorCustomersLookup</div>;
}
