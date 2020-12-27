import React from 'react'
import Feature from './Feature'

const Display = ({ displayedCountries, setDisplayedCountries }) => {
    if (displayedCountries.length > 10) {
        return (
            <div>
                Too many matches, please try another filter.
            </div>
        )
    } else if (displayedCountries.length === 1) {
        return (
            <Feature country={displayedCountries[0]} />
        )
    } else {
        return (
            <div>
                {displayedCountries.map(
                    country =>
                        <div key={country.name}>
                            {country.name}
                            <button onClick={() => setDisplayedCountries([country])}>
                                show
                            </button>
                        </div>)}
            </div>
        )
    }
}

export default Display