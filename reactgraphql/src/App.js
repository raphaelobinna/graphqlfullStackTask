import './App.css';
import { ApolloProvider } from '@apollo/client';
import { client } from './ApolloClient/client';
import { Page } from './page';
import ContinentContextProvider from './context';

function App() {
  return (
    <ApolloProvider client={client}>
      <ContinentContextProvider>
      <Page />
      </ContinentContextProvider>
    </ApolloProvider>
  );
}

export default App;
