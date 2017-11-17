import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import uiReducer, { UIState } from "./ui/reducer";
import contactReducer, { ContactState } from "./contacts/reducer";
import { all } from "redux-saga/effects";
import { contacts } from "./contacts/saga";
export interface IState {
  contacts: ContactState;
  ui: UIState;
}

const reducer = combineReducers({
  contacts: contactReducer,
  ui: uiReducer
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
export const getStore = () => {
  const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(
      sagaMiddleware
    )
  )
);
  sagaMiddleware.run(function* rootSaga() {
    yield all([
      contacts()
    ]);
  });
  return store;
};
