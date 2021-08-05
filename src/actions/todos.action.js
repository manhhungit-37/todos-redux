import axios from "axios";
import store from "store/store";

//action
export const ADD_TODO = "TODOS/ADD";
export const DELETE_TODO = "TODOS/DELETE";
export const FETCH_TODOS_REQUEST = "TODOS/FETCH_REQUEST";
export const FETCH_TODOS_SUCCESS = "TODOS/FETCH_SUCCESS";
export const FETCH_TODOS_FAILURE = "TODOS/FETCH_FAILURE";

export const addTodo = (todos) => dispatch => {
  axios.post("https://tony-json-server.herokuapp.com/api/todos", todos)
    .then(() => {
      return {
        type: ADD_TODO,
        payload: todos
      }
    })
  
}

export const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    payload: {
      id
    }
  }
}

export const getTodos = () => async dispatch => {
  const user = store.getState().auth.user;
  dispatch({ type: FETCH_TODOS_REQUEST });
  try {
    const res = await axios.get("https://tony-json-server.herokuapp.com/api/todos");
    const todos = res.data.data.filter(todo => todo.author === user);
    dispatch({ type: FETCH_TODOS_SUCCESS, payload: todos });
  } catch (error) {
    dispatch({ type: FETCH_TODOS_FAILURE });
  }
}