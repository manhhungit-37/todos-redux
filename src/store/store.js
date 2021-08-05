import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
//reducer
import authenticateReducer from 'reducers/authenticate.reducer';
import userReducer from 'reducers/user.reducer';
import todosReducer from 'reducers/todos.reducer';




const rootReducer = combineReducers({
  user: userReducer,
  auth: authenticateReducer,
  todos: todosReducer
})

const composeEnhancers =
  process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const store = createStore(rootReducer,  composeEnhancers(applyMiddleware(thunk)));

export default store;