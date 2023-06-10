import React from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Checkbox, Button } from "antd";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div className="flex justify-center mt-48">
      <div className="bg-slate-300 p-4 rounded-xl">
        <p className="text-center text-2xl mb-4 font-bold">LOGIN</p>
        <Form
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="text-slate-400" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-slate-400" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <div className="flex flex-col justify-center ">
              <Button className="bg-blue-500 text-white mb-2">LOGIN</Button>
                <Link to="/register" className="text-center text-sm hover:text-green-500">Register Here !</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
