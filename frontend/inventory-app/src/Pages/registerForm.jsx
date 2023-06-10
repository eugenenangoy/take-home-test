import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import React from "react";

const RegisterForm = () => {
  return (
    <div className="flex justify-center mt-48">
      <div className="w-1/5 bg-slate-300 p-4 rounded-xl">
        <p className="text-center text-2xl mb-4 font-bold">REGISTER</p>
        <Form>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Username Harus Diisi" }]}
          >
            <Input placeholder="Input Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Password Harus Diisi" }]}
          >
            <Input.Password placeholder="Input Password" />
          </Form.Item>
            <div className="flex flex-col justify-center ">
              <Button className="bg-blue-500 text-white mb-2">REGISTER</Button>
              <Link
                to="/"
                className="text-center text-sm hover:text-green-500"
              >
                Login Here !
              </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
