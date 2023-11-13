import React from 'react';
import Blog from './components/Blog';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql';
import './App.css';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <h1>GraphQL Blog</h1>
        </header>
        <main>
          <Blog />
        </main>
      </div>
    </ApolloProvider>
  );
};

export default App;