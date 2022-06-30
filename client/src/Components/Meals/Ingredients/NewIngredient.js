import React, { useEffect, useState } from "react";
import { FormCheck, FormGroup } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";
import { connect } from "react-redux";
import ingredientsStyles from "./ingredients.module.css";

export const NewIngredient = ({ addIngredient }) => {
  const [isAllergen, setIsAllergen] = useState(false);
  const [name, setName] = useState("");

  const handleAlllergenCheck = () => {
    setIsAllergen((prevIsAllergen) => !prevIsAllergen);
  };
  const onIngredientNameChange = (e) => {
    setName(e.target.value);
  };
  const onAdd = (e) => {
    e.preventDefault()
    const newIngredient = {
      name,
      allergen: isAllergen,
      id: uuid(),
    };
    setName("")
    setIsAllergen(false)
    addIngredient(newIngredient);
  };

  return (
    <div className={ingredientsStyles.container}>
    <div className={ingredientsStyles.previewList}></div>
      <div className={ingredientsStyles.newItem}>
        <FormGroup>
          <input
            type="text"
            onChange={onIngredientNameChange}
            placeholder="Ingredient name"
            value={name}
          ></input>
        </FormGroup>
        <div className="checkboxContainer">
          <FormCheckLabel>Allergen</FormCheckLabel>
          <FormCheck
            onChange={handleAlllergenCheck}
            checked={isAllergen}
          ></FormCheck>
        </div>
        <button onClick={onAdd}>Add</button>
      </div>
    </div>
  );
};

NewIngredient.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NewIngredient);
