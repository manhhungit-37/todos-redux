import axios from 'axios';
import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_SUCCESS } from 'reducers/authenticate.reducer';
import store from "store/store";
import { addNewUser } from './user.action';

export const login = (username, password) => {
  const users = store.getState().user.users;

  const isAccount = users.find((item) => {
    return item.username === username && item.password === password;
  })
  if (!isAccount) {
    return { 
      type: LOGIN_FAILURE,
      payload: {
        message: "Incorrect account or password" 
      }
    };
  }
  localStorage.setItem("user", JSON.stringify(username));
  return { type: LOGIN_SUCCESS, payload: { username, password } };
}

export const logout = () => {
  localStorage.removeItem("user");
  return {
    type: LOGOUT
  }
}

export const register = (username, email, password) => dispatch => {
  const users = store.getState().user.users;
  const isHadAccount = users.some((item) => {
    return item.username === username || item.email === email;
  })

  try {
    if(isHadAccount) {
      dispatch({ 
        type: REGISTER_FAILURE,
        payload: {
          message: "Account or username already exists"
        }
      })
      return;
    }
    axios.post("https://tony-json-server.herokuapp.com/api/users", {
      username,
      email,
      password
    }).then(() => {
      addNewUser({ username, email, password });
      dispatch({ type: REGISTER_SUCCESS });
    })
    
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: {
        message: error
      }
    })
  }
}