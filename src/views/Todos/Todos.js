import React, { useEffect } from 'react';
import { Table, Tag, Space, Button } from 'antd';
import { logout } from 'actions/authenticate.action';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import TodoForm from './TodoForm';
import { List } from 'rc-field-form';
import { getTodos } from 'actions/todos.action';

function Todos() {
  const user = useSelector(state => state.auth.user);
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const todos = useSelector(state => state.todos.todos);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user || !isSignedIn) {
      history.push("/login");
    }
    dispatch(getTodos());

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isSignedIn])


  return (
      <>
        <Button type="primary" onClick={() => dispatch(logout())}>Logout</Button>
        <TodoForm />
        <List
          itemLayout="horizontal"
          dataSource={todos}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </>
  )
}

export default Todos
