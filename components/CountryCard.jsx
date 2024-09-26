import React from "react";
import {Link} from 'react-router-dom'
export default function CountryCard({ name, flag, population, region, capital }) {
  return (
    <Link  className="country-card" to = {`/country?name=${name}`}>
      <img src={flag} alt={name + "Flag"} />
      <div className="card-text">
        <h3 className="card-text">{name}</h3>
        <p>
          <b>Population: </b>
          {population.toLocaleString("en-PK")}
        </p>
        <p>
          <b>Region: </b>{region}
        </p>
        <p>
          <b>Capital: </b>{capital}
        </p>
      </div>
    </Link>
  );
}
