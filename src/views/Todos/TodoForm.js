import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { addTodo } from 'actions/todos.action';
import { useSelector } from 'react-redux';

function TodoForm() {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const onFinish = (newTodo) => {
    dispatch(addTodo({
      id: Date.now(),
      author: user.substr(1, user.length - 2),
      title: newTodo.title,
      description: newTodo.description,
      severity: newTodo.severity
    }))
  }

  return (
    <Form
      name="basic"
      className="login-form"
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      initialValues={{
        severity: "low",
      }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: 'Please input your title!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: 'Please input your description!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Severity" name="severity">
          <Select>
          <Select.Option value="low">Low</Select.Option>
          <Select.Option value="medium">Medium</Select.Option>
          <Select.Option value="high">High</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 23,
          span: 1,
        }}
      >
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
     
    </Form>
  )
}

export default TodoForm
