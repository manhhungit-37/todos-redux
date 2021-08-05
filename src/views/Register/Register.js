import React, { useEffect } from 'react'
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { register } from 'actions/authenticate.action';
import { useHistory } from 'react-router';

function Register() {
  const message = useSelector(state => state.auth.signUpMessage);
  const isSignedUp = useSelector(state => state.auth.isSignedUp);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!message && isSignedUp) {
      history.push("/login");
      return;
    }
  })

  const onFinish = account => {
    dispatch(register(account.username, account.email, account.password));
  };
  return (
    <div>
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
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
          {
            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Please input email type"
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
        <Checkbox>I agree to all terms</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 9,
          span: 15,
        }}
      >
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
    </Form>
    </div>
  )
}

export default Register
