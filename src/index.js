import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CartProvider } from "react-use-cart";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
const theme = extendTheme({
  colors: {
    background: {
      light: '#f0f0f0',
      dark: '#333333',
    },
  },
  body: {
    fontFamily: '"Noto Sans Lao", sans-serif'
  }
});
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Provider store={store}>
      <CartProvider>
        < ChakraProvider  theme={theme}>
            <App />
        </ChakraProvider>
      </CartProvider>
        </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
