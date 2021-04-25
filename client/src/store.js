import { createStore, combineReducers, applyMiddleware } from "redux";
// Middleware with async logic
import thunk from "redux-thunk";
// Required to use React Devtools extension
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer } from "./reducers/productReducers";

const reducer = combineReducers({
  productList: productListReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
