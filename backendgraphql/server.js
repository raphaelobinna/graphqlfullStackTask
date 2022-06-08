const express = require('express')
const schema = require('./src/index')
const { ApolloServer } = require('apollo-server-express')
// create our express app
const app = express()

const getUser = (req) => {
  if (!req) return null
  const token = req.split(' ')[1]
  return token
}

// graphql endpoint
const server = new ApolloServer({
  schema,
  playground: true,
  introspection: true,
  context: ({ req }) => {
    // get the user token from the headers

    const token = req.headers.authorization || '';

    

    const user = getUser(token);

    
    return { user };
  }
});

server.applyMiddleware({ app });

app.listen({ port: process.env.PORT || 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
