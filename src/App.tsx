import "./styles.css";
import Checkbox from "./checkbox";
import { useEffect, useState } from "react";
import React from "react";

const countriesList = [
  {
    id: 1,
    name: "India",
    active: false
  },
  {
    id: 2,
    name: "Usa",
    active: false
  },
  {
    id: 3,
    name: "France",
    active: false
  }
];

export default function App() {
  const [countries, setCountries] = useState(countriesList);
  const [selectAll, setSelectAll] = useState(false);

  const handleCarClick = (id) => {
    // Create a new copy of the state
    const countriesCopy = [...countries];

    // Find the country that was clicked
    const countryToUpdate = countriesCopy.find((country) => country.id === id);

    if (countryToUpdate !== undefined) {

      countryToUpdate.active = !countryToUpdate.active;

      if (!countryToUpdate.active && selectAll) {
        handleSelectAll();
      }
  
      // Set the state
      setCountries(countriesCopy);
  
      // Logic for selectAll
      // 1. If ALL items are active (selected), selectAll -> true
      // 2. If even ONE item is NOT active (selected), selectAll -> false
  
      let flag = true;
      for (let i = 0; i < countries.length; i++) {
        flag = flag && countries[i].active;
      }
  
      if (flag && !selectAll) {
        handleSelectAll();
      }

    }


  };

  const handleSelectAll = () => {
    // Toggling selectAll state
    setSelectAll((prevState) => !prevState);

    // selectAll is NOT the latest
    setCountries(countries.map((country) => ({ ...country, active: !selectAll })));
  };

  return (
    <div className="App">
      <div className="item select-all">
        <Checkbox checked={selectAll} onChange={handleSelectAll} />
        <p> {`${selectAll ? "De-select" : "Select"}`} All </p>
      </div>
      {countries.map((country) => (
        <div className="item" key={country.id}>
          <Checkbox
            checked={country.active}
            onChange={() => handleCarClick(country.id)}
          />
          <p>{country.name}</p>
        </div>
      ))}
    </div>
  );
}
