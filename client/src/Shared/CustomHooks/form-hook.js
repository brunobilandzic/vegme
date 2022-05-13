const { useReducer, useCallback, useState } = require("react");

const formHandler = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId == action.inputId)
          formIsValid = formIsValid && action.isValid;
        else formIsValid = formIsValid && state.inputs[inputId].isValid;
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { isValid: action.isValid, value: action.value },
        },
        isValid: formIsValid,
      };
    case "CLEAR_FORM":
      Object.keys(state.inputs).forEach((key) => {
        state.inputs[key].value = "";
        state.inputs[key].isValid = false;
      });
      
      state.isValid = false;
      return state;
    default:
      return state;
  }
};

const useForm = (initialInputs, initialValidity) => {
  const [formState, dispatch] = useReducer(formHandler, {
    inputs: initialInputs,
    isValid: initialValidity,
  });
  const [rerender, setRerender] = useState(false)
  const clearForm = useCallback(() => {
    dispatch({ type: "CLEAR_FORM" });
    setRerender(prevRerender => !prevRerender)
  }, []);

  const inputHandler = useCallback((value, id, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value,
      inputId: id,
      isValid,
    });
  });

  return [formState, inputHandler, clearForm];
};

module.exports = { useForm };
