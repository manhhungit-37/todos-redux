import axios from "axios";

export const ADD_USER = "USER/ADD";
export const FETCH_USER_REQUEST = "USER/FETCH";
export const FETCH_USER_SUCCESS = "USER/FETCH_SUCCESS";
export const FETCH_USER_FAILURE = "USER/FETCH_FAILURE";

export const addNewUser = (payload) => ({
  type: ADD_USER,
  payload,
})

export const getUsers = () => async dispatch => {
  dispatch({ type: FETCH_USER_REQUEST });
  try {
    const res = await axios.get("https://tony-json-server.herokuapp.com/api/users");
    if(!Array.isArray(res.data.data)) {
      dispatch({ 
        type: FETCH_USER_FAILURE, 
        payload: {
          message: "Response is not array"
        }
      })
      return;
    }
    dispatch({ type: FETCH_USER_SUCCESS, payload: res.data.data });
  }
  catch (error) {
    dispatch({ 
      type: FETCH_USER_FAILURE, 
      payload: {
        message: error
      } })  
  }
}

