import { createStore, combineReducers, applyMiddleware } from "redux";
// Middleware with async logic
import thunk from "redux-thunk";
// Required to use React Devtools extension
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({});

const initialState = {};

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store
