import React, { useContext, useEffect, useState } from "react";
import "./CountryDetail.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";

export default function CountryDetails() {
  const [isDark] = useContext(ThemeContext); //feature of react router 
  const params = useParams(); //feature of react router 
  const {state} = useLocation(); //feature of react router 
  const countryName = params.country;
  const [countryData, setcountryData] = useState(null);

  const [notFound, setnotFound] = useState(false);

  function updateCountryData (data){
    setcountryData({
      name: data.name.common,
      nativeName: Object.values(data.name.nativeName)[0].common,
      population: data.population,
      region: data.region,
      subregion: data.subregion,
      capital: data.capital,
      tld: data.tld,
      currencies: Object.values(data.currencies)
        .map((currency) => currency.name)
        .join(", "),
      languages: Object.values(data.languages).join(", "),
      flags: data.flags.svg,
      borders: [],
    })
    if (!data.borders) {
      data.borders = [];
    }
    Promise.all(data.borders.map((border) => {
      return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
       .then((res) => res.json())
       .then(([borderCountry])=> borderCountry.name.common)
   })).then((borders) =>{
    setTimeout(() => {
      setcountryData((prevState) => ({...prevState, borders: borders}))
    })
    
   })
  }

  useEffect(() => {

    if (state) {
      updateCountryData(state);
      return
    }

    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        updateCountryData(data);
      })
      .catch((err) => {
        setnotFound(true);
      }); 
  }, [countryName]); // We are providing countryName as a dependency because our country name gets changed when we click on any other country on the list
 
  if (notFound) {
    return <div>Country Not Found</div>;
  }

  return countryData === null ? (
    "Loading....."
  ) : (
    <main className={`${isDark ? 'dark' : ''}`}>
      <div className="country-details-container">
        <span className="back-button" onClick={() => history.back()}>
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
                <b>
                  Population: {countryData.population.toLocaleString("en-PK")}
                </b>
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
                <b>Capital: {countryData.capital.join(", ")}</b>
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
            {countryData.borders.length !== 0 && <div className="border-countries">
              <b>Border Countries: </b>&nbsp;
              {countryData.borders.map((border) => 
                <Link key={border} to={`/${border}`}>
                  {border}
                </Link>
              )}
            </div>}
          </div>
        </div>
      </div>
    </main>
  );
}
