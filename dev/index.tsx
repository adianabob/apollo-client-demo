import { hot } from "react-hot-loader/root";
import * as React from "react";
import { render } from "react-dom";
import ApolloClientDemo from "../src";

const App = hot(() => (
    <ApolloClientDemo />
));

const rootNode = document.getElementById("root");
render(<App />, rootNode);
