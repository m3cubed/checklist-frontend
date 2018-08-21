import ReduxThunk from "redux-thunk";
import { applyMiddleware } from "redux";
import { compose } from "redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default composeEnhancers(applyMiddleware(ReduxThunk));
