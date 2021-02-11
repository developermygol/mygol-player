import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import organizationReducer from './reducers/organizationReducer';
// import seasonsReducer from './reducers/seasonsReducer';
import tournamentsReducer from './reducers/tournamentsReducer';
// import tournamnetModesReducer from './reducers/tournamentModesReducer';

const rootReducer = combineReducers({
  organizations: organizationReducer,
  //   seasons: seasonsReducer,
  // tournamentModes: tournamnetModesReducer,
  tournaments: tournamentsReducer,
});

// const composeEnhancers =
//   (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
