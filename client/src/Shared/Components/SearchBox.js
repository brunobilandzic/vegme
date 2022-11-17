import React, { useState } from "react";
import searchStyles from "./search.module.css";

export default function SearchBox({ searchFunction, placeholder }) {
  const [searchString, setSearchString] = useState("");
  const handleSearchInput = (e) => {
    setSearchString(e.target.value);
  };
  return (
    <div className={`${searchStyles.wrap}`}>
      <div className={`${searchStyles.input}`}>
        <input
          tyoe="text"
          placeholder={placeholder}
          onChange={handleSearchInput}
        />
      </div>
    </div>
  );
}
