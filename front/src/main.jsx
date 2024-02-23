import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import store, { persistor } from "../src/store/index.js"; // Import Redux store and persistor

import App from "./App.jsx"; 

ReactDOM.createRoot(document.getElementById("root")).render(

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {" "}
        {/* Wrap your app with PersistGate */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>

);
