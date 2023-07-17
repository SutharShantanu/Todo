import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";
import { Provider } from "react-redux";
import Store from "./Redux/Store";

const theme = extendTheme({
    styles: {
        global: (props) => ({
            body: {
                bg: props.colorMode === "light" ? "white" : "gray.700",
            },
        }),
    },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={Store}>
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <CSSReset />
                <App />
            </ChakraProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);

reportWebVitals();
