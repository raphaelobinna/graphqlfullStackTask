const { ApolloServer, gql } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolver')

const typeDefs = gql `

type Author {
  name: String
  email: String
  date: String
}

type Committer {
  name: String
  email: String
  date: String
}

type CommitInfo {
  url: String
  author: Author
  committer: Committer
  message: String
}

type Branch {
  sha:  String
  html_url: String
  commit: CommitInfo
 
}


type Mutation {
  # User Mutations
  signupUser : String
  
  
}



type Query {
# Branch Queries
landing: String
commits(offset: Int!, limit:Int! ): [Branch]

}

`;

module.exports = makeExecutableSchema({ typeDefs, resolvers })