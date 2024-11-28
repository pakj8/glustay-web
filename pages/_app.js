import { Poppins } from "next/font/google";
import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "../services/graphql";
import Navbar from "../components/navbar/Navbar";
import { Provider } from "react-redux";
import store from "../redux/store";
import { useState } from "react";
import { Router } from "next/router";
import RouterLoader from "../components/loader/RouterLoader";

// Call the font loader at the module scope
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", () => setLoading(true));
  Router.events.on("routeChangeComplete", () => setLoading(false));
  Router.events.on("routeChangeError", () => setLoading(false));

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <main className={`${poppins.className}`}>
          <Navbar />
          <Component {...pageProps} />
          {loading && <RouterLoader />}
        </main>
      </ApolloProvider>
    </Provider>
  );
}
