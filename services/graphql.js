import { ApolloClient, InMemoryCache, from } from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
// const uploadLink = createUploadLink({ uri: " http://localhost:4000/graphql" });

const apolloLinks = [];

// apolloLinks.push(
//   createUploadLink({
//     uri: "https://glustay-api-production-1778.up.railway.app/graphql",
//   })
// );
apolloLinks.push(createUploadLink({ uri: "http://localhost:4000/graphql" }));

const client = new ApolloClient({
  link: from(apolloLinks), // Update to your GraphQL server URI
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

export default client;
