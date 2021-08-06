import { getUsers } from 'actions/user.action';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Login from 'views/Login/Login';
import Register from 'views/Register/Register';
import Todos from 'views/Todos/Todos';

function App() {
  const user = useSelector(state => state.auth.user);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  })

  return (
    <Router>
      <Route exact path="/" >
        {user && isSignedIn ? <Redirect to="/todos" /> : <Redirect to="/login" />}
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/todos">
        <Todos />
      </Route>

    </Router>
  )
}
export default App;
