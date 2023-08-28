import React, { FunctionComponent, useEffect, useState } from "react";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  DefaultOptions,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { FiltersContextProvider } from "@app/FiltersContext";
import { Dashboard } from "@app/Dashboard";

const GRAPHQL_GATEWAY_URL = "/apollo-client-demo-server/graphql";

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "cache-first",
    errorPolicy: "none",
  },
  query: {
    fetchPolicy: "cache-first",
    errorPolicy: "none",
  },
};

const getClient = (): ApolloClient<NormalizedCacheObject> => {
  const authLink = setContext((GraphQLRequest, { headers }) => ({
    headers: {
      ...headers,
      Authorization: `Bearer fake-token`,
    },
  }));

  const httpLink = new HttpLink({
    uri: GRAPHQL_GATEWAY_URL,
  });

  return new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
    connectToDevTools: true,
  });
};

const ApolloClientDemo: FunctionComponent = () => {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();
  useEffect(() => {
    const auth = async (): Promise<void> => {
      setClient(getClient());
    };
    auth();
  }, []);

  return client ? (
    <ApolloProvider client={client}>
      <FiltersContextProvider>
        <Dashboard />
      </FiltersContextProvider>
    </ApolloProvider>
  ) : (
    <div>Loading</div>
  );
};

export default ApolloClientDemo;
