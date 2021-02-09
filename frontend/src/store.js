import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
// Reducer imports
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  gameListReducer,
  gameDetailsReducer,
  gameCreateReducer,
  gameUpdateReducer,
  gameDeleteReducer,
  gameFilterReducer,
  gameListMyReducer,
} from "./reducers/gameReducers";

// Combine all reducers
const reducer = combineReducers({
  // Future reducers go in here stateName: stateNameReducer
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  gameList: gameListReducer,
  gameDetails: gameDetailsReducer,
  gameCreate: gameCreateReducer,
  gameUpdate: gameUpdateReducer,
  gameDelete: gameDeleteReducer,
  gameFilter: gameFilterReducer,
  gameListMy: gameListMyReducer,
});

// Get user info if it is in localStorage from a previous login
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// Set an intial state object
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

// Initialize middleware from thunk
const middleware = [thunk];

// Create store using reducer, initialState, and composeWithDevTools
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
