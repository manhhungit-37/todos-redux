import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'actions/authenticate.action';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
  const message = useSelector(state => state.auth.signInMessage);
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (isSignedIn && !message) {
      history.push("/todos");
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn, message]);

  const onFinish = (account) => {
    dispatch(login(account.username, account.password));
  };

  return (
    <Form
      name="basic"
      className="login-form"
      labelCol={{
        span: 9,
      }}
      wrapperCol={{
        span: 6,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
          {
            min: 6,
            message: "Please input length of user name > 6"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      {message && <div className="error">{message}</div>}

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 9,  
          span: 15,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 9,
          span: 15,
        }}
      >
        <Button type="primary" htmlType="submit">
          Login
        </Button>
        <Link to="/register" className="ml-5" >Sign Up</Link>
      </Form.Item>
     
    </Form>
  );
};

export default Login;