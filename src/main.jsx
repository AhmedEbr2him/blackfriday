import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./reducers/soter.js";
// import { AllProviders } from "./combainProvider.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<App />;
	</Provider>
);
