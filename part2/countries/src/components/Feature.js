import React, { useEffect, useState } from 'react'
import axios from 'axios'

const isEmpty = obj => {
    return !obj || Object.keys(obj).length === 0;
}

const WeatherDialog = ({ weatherInfo }) => {
    if (isEmpty(weatherInfo)) {
        return (
            <p>Loading...</p>
        )
    } else {
        return (
            <>
                <p>The temperature is {weatherInfo.main.temp} Celsius </p>
                <p>...But it feels like {weatherInfo.main.feels_like} Celsius.</p>
                <p>Wind speed is {weatherInfo.wind.speed} meters/s, at {weatherInfo.wind.deg} degrees</p>
            </>
        )
    }
}

export const Feature = ({ country }) => {
    const url = `https://api.openweathermap.org/data/2.5/find?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    const [weatherInfo, setWeather] = useState([])

    useEffect(() => {
        axios
            .get(url)
            .then(result => {
                setWeather(result.data.list[0])
            })
    }, [])

    return (
        <>
            <h1>{country.name}</h1>
            <p>Capital {country.capital}</p>
            <p>Population: {country.population}</p>

            <h2>Languages</h2>
            <ul>
                {country.languages.map(lang => <li key={lang.iso639_1}> {lang.name} </li>)}
            </ul>
            <img src={country.flag} width="300" height="200" alt="new" />

            <h2>Weather in {country.capital}</h2>
            <WeatherDialog weatherInfo={weatherInfo} />
        </>
    )
}

export default Feature