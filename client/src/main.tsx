import { ApolloProvider } from "@apollo/client";
import ReactDOM from "react-dom/client";
import createApolloClient from "./apollo/client";
import App from "./App";
import "./index.css";

const client = createApolloClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
