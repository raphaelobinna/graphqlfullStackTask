import { createContext, useEffect, useState } from 'react';
import { ApolloProvider, useLazyQuery } from '@apollo/client';
import { GET_ALL_CONTINENTS } from './graphql/queries';

export const ContinentContext = createContext()

const ContinentContextProvider = (props) => {


    const [continents, setContinents] = useState([])

    const [isLastNode, setIsLastNode] = useState(false)



    const [getContinents, { data, error, loading }] = useLazyQuery(GET_ALL_CONTINENTS)

    useEffect(() => {
        getContinents()
        data && setContinents(data.continents)
    }, [data])

    const checkNode = (parentArray, item) => {

        if (parentArray && parentArray[parentArray.length -1].code === item.code) {
            console.log('last node')
            return true
        } else {
            return false
        }

    }

    if (loading) return <p>Loading ...</p>;
    if (error) return `Error! ${error}`;

    if (continents.length > 0) {
        return (
            <ContinentContext.Provider value={{continents, checkNode, isLastNode}}>
                {props.children}
            </ContinentContext.Provider>
        )
    }
    return <p>....</p>


}

export default ContinentContextProvider;
