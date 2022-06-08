import React, { useContext, useState, useEffect } from 'react';
import ContinentContextProvider, { ContinentContext } from './context';
import './page.css';

export const Page = () => {

    const { continents, checkNode, isLastNode } = useContext(ContinentContext);

    const [selected, showSelected] = useState([])

    const [showLanguage, setShowLanguage] = useState(false);

    const [showState, setShowState] = useState(false);

    const handleContinentClick = (continent) => {
        showSelected(continent)
        //currentContinent === continent.code ? setCurrentContinent() : setCurrentContinent(continent.code);
    }
    const childCheck = (parentArray, item) => {
        const result = checkNode(parentArray, item)
        if (result) {
           showSelected([])
            setShowLanguage(false);
            setShowState(false);
        }
    }


    return (
        <>
            <h4>NESTED LIST OF CONTINENTS</h4>

            <ul id="myUL">
                {continents.map((continent, a) => (
                    <li><span className={selected[0]?.code === continent.code ? "caret caret-down" : "caret"} onClick={() => handleContinentClick([continent])} >  {a + 1 + ' ' + continent.name}</span>
                        <ul className={selected[0]?.code === continent.code ? "active" : "nested"}>
                            {continent.countries.map((country, b) => (
                                <li><span className={selected[1]?.code === country.code ? "caret caret-down" : "caret"} onClick={() => handleContinentClick([continent, country])}>  {b + 1 + ' ' + country.emoji + ' ' + country.name} </span>

                                    <ul className={selected[1]?.code === country.code ? "active" : "nested"}>

                                        <li><span className="caret" onClick={() => setShowLanguage(!showLanguage)} >languages</span>

                                            <ul className={showLanguage ? "active" : "nested"}>
                                                {country.languages.length === 0 ? <li onClick={() => childCheck(['last'], 'last')} >No languages</li> : 
                                                showLanguage && country.languages && country.languages.map((language, c) => (
                                                    <li><span className="caret" onClick={() => childCheck(country.languages, language)} >{c + 1 + ' ' + language.name}</span>

                                                    </li>
                                                ))}
                                            </ul>

                                        </li>

                                        <li><span className="caret" onClick={() => setShowState(!showState)} >states</span>

                                            <ul className={showState ? "active" : "nested"}>
                                                {country.states.length === 0 ? <li onClick={() => childCheck(['last'], 'last')} >No states</li> :
                                                showState && country.states && country.states.map((state, d) => (
                                                    <li><span className="caret" onClick={() => childCheck(country.states, state)} >{d + 1 + ' ' + state.name}</span>

                                                    </li>
                                                ))}
                                            </ul>

                                        </li>


                                    </ul>
                                </li>
                            ))}

                        </ul>
                    </li>
                )
                )}
            </ul>



        </>

    )

}
