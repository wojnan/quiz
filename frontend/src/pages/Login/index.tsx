import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex} from "antd";
import { useNavigate } from 'react-router-dom';
import { login } from "../../api/api";

const Login: React.FC = () => {

  const navigate = useNavigate();
  const handleLogin = async (values: any) => {

    try {
      const response = await login (values.username, values.password);

      const { user, token } = response;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id.toString());
      localStorage.setItem("username", user.username);
      localStorage.setItem("email",user.email);

      alert(`Welcome ${user.username}!`);
      navigate("/home");
    } catch (err: any) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={handleLogin}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="">Forgot password</a>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
          or <a href="/register">Register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
