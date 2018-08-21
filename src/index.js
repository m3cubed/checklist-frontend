import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Auth from "./components/Login/Auth";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import middleware from "./middleware";
import reducer from "./reducers";
import "typeface-roboto";

const auth = new Auth();
const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#7cb342",
			light: "#aee571",
			dark: "#4b830d",
			contrastText: "#000"
		},
		secondary: {
			main: "#b71c1c",
			light: "#fo05545",
			dark: "#7f0000",
			contrastText: "#fff"
		}
	}
});

//import { loadState, saveState } from "./localState";

//const persistedState = loadState();

const store = createStore(reducer, middleware);

// store.subscribe(() => {
// 	saveState(store.getState());
// });
auth
	.checkAuthentication(store.dispatch)
	.then(() => {
		ReactDOM.render(
			<Provider store={store}>
				<MuiThemeProvider theme={theme}>
					<App auth={auth} />
				</MuiThemeProvider>
			</Provider>,
			document.getElementById("root")
		);
	})
	.catch(err => {
		console.log(err);
		ReactDOM.render(
			<Provider store={store}>
				<MuiThemeProvider theme={theme}>
					<App auth={auth} />
				</MuiThemeProvider>
			</Provider>,
			document.getElementById("root")
		);
	});
registerServiceWorker();
