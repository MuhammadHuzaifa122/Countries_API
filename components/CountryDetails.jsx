import React, { useEffect, useState } from "react";
import './CountryDetail.css'

export default function CountryDetails() {
  const countryName = new URLSearchParams(location.search).get("name");
  const [countryData, setcountryData] = useState(null)
    
  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        setcountryData({
          name: data.name.common,
          nativeName:  Object.values(data.name.nativeName)[0].common,
          population: data.population,
          region: data.region,
          subregion: data.subregion,
          capital: data.capital,
          tld: data.tld,
          currencies: Object.values(data.currencies)
          .map((currency) => currency.name)
          .join(", "),
          languages: Object.values(data.languages).join(', '),
          flags: data.flags.svg,
        //   borders: data.borders,
          
        });
      });
  }, []);

  return (
    countryData === null? 'Loading.....' : <main>
    <div className="country-details-container">
      <span className="back-button">
        <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
      </span>
      <div className="country-details">
        <img src={countryData.flags} alt="" />
        <div className="details-text-container">
          <h1>{countryData.name}</h1>
          <div className="details-text">
            <p>
              <b>Native Name: {countryData.nativeName}</b>
              <span className="native-name"></span>
            </p>
            <p>
              <b>Population: {countryData.population.toLocaleString("en-PK")}</b>
              <span className="population"></span>
            </p>
            <p>
              <b>Region: {countryData.region}</b>
              <span className="region"></span>
            </p>
            <p>
              <b>Sub Region: {countryData.subregion}</b>
              <span className="sub-region"></span>
            </p>
            <p>
              <b>Capital: {countryData.capital.join(', ')}</b>
              <span className="capital"></span>
            </p>
            <p>
              <b>Top Level Domain: {countryData.tld}</b>
              <span className="top-level-domain"></span>
            </p>
            <p>
              <b>Currencies: {countryData.currencies}</b>
              <span className="currencies"></span>
            </p>
            <p>
              <b>Languages: {countryData.languages}</b>
              <span className="languages"></span>
            </p>
          </div>
          <div className="border-countries">
            <b>Border Countries: </b>&nbsp;
          </div>
        </div>
      </div>
    </div>
  </main>
  );
}
