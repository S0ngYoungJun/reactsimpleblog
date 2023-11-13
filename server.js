const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    posts: [Post]
  }

  type Mutation {
    createPost(userId: Int!, title: String!, body: String!): Post
  }

  type Post {
    userId: Int
    id: Int
    title: String
    body: String
  }
`;

const posts = [
  {
    userId: 1,
    id: 1,
    title: 'Sample Post 1',
    body: 'This is the body of the sample post 1.',
  },
  {
    userId: 1,
    id: 2,
    title: 'Sample Post 2',
    body: 'This is the body of the sample post 2.',
  },
];

const resolvers = {
  Query: {
    posts: () => posts,
  },
  Mutation: {
    createPost: (_, { userId, title, body }) => {
      const newPost = {
        userId,
        id: posts.length + 1,
        title,
        body,
      };

      posts.push(newPost);

      return newPost;
    },
  },
};


const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

async function startServer() {
  await server.start();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
  });
}

startServer();