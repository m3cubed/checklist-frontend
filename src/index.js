import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
//import registerServiceWorker from "./registerServiceWorker";
import { unregister } from "./registerServiceWorker";
import Auth from "./components/Login/Auth";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import middleware from "./middleware";
import reducer from "./reducers";
import { loadState, saveState } from "./localState";
import throttle from "lodash/throttle";
import "typeface-roboto";

const auth = new Auth();
const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#7cb342",
			light: "#aee571",
			dark: "#4b830d",
			contrastText: "#000",
		},
		secondary: {
			main: "#b71c1c",
			light: "#fo05545",
			dark: "#7f0000",
			contrastText: "#fff",
		},
		background: {
			default: "#394352",
		},
	},
});

// const persistedState = loadState();

const store = createStore(reducer, middleware);

// store.subscribe(
// 	throttle(() => {
// 		saveState({
// 			studentHWStatus: store.getState().studentHWStatus,
// 			seatingPositions: store.getState().seatingPositions
// 		});
// 	}, 1000)
// );

auth.checkAuthentication(store.dispatch).then(() => {
	ReactDOM.render(
		<Provider store={store}>
			<MuiThemeProvider theme={theme}>
				<App auth={auth} />
			</MuiThemeProvider>
		</Provider>,
		document.getElementById("root"),
	);
});
unregister();
// registerServiceWorker();
