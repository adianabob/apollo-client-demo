const { ApolloServer, gql, AuthenticationError } = require("apollo-server");
const fs = require("fs");
const resolvers = require("./graphql.resolvers");
const typeDefs = gql(
  fs.readFileSync(process.cwd() + "/schema.graphql", "utf8")
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    {
      requestDidStart() {
        return {
          didEncounterErrors({ response, errors }) {
            if (errors.find((err) => err instanceof AuthenticationError)) {
              response.http.status = 401;
            }
          },
        };
      },
    },
  ],
});

server.listen({ port: 4009 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
