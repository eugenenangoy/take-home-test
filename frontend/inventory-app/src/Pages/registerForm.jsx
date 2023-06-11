import { Button, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doRegisterUser } from "../Store/Actions/userAuthAction";

const RegisterForm = () => {
  const { user, error } = useSelector((state) => state.userReducers);
  const routes = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    if (user !== "Username Sudah Ada" && user) {
      messageApi
        .open({
          type: "loading",
          content: "loading....",
          duration: 1,
        })
        .then(() => message.success("Register Berhasil", 0.5))
        .then(() => routes("/"));
    }
  }, [user]);

  useEffect(() => {
    if (error !== null || user == "Username Sudah Ada") {
      messageApi
        .open({
          type: "loading",
          content: "loading....",
          duration: 1,
        })
        .then(() => message.error(user, 0.5));
    }
  }, [error, user]);

  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(doRegisterUser(values));
  };
  return (
    <>
      {contextHolder}
      <div className="flex justify-center mt-48">
        <div className="w-1/5 bg-slate-300 p-4 rounded-xl">
          <p className="text-center text-2xl mb-4 font-bold">REGISTER</p>
          <Form onFinish={onFinish}>
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
              <Button htmlType="submit" className="bg-blue-500 text-white mb-2">
                REGISTER
              </Button>
              <Link to="/" className="text-center text-sm hover:text-green-500">
                Login Here !
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
