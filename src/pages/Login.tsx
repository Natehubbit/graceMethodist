import React, { ChangeEvent, useState } from "react";
import { LogIn } from "react-feather";
import { LOGO_URL } from "../common/constants";
import Button from "../components/Button";
import Input from "../components/Input";
import { LoginForm } from "../@types/index";
import _ from "lodash";
import AuthService from "../services/AuthService";
import { useHistory } from "react-router-dom";
import { nanoid } from "nanoid";

const Login = () => {
  const { replace } = useHistory();
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState<string>("");
  const hasErrors = error.length > 0;
  const [form, setForm] = useState<LoginForm>({
    email: null,
    password: null,
    // remember: false,
  });
  const onTextChange: (
    e: ChangeEvent<HTMLInputElement>,
    type: keyof LoginForm
  ) => void = ({ target }, type) => {
    const { value } = target;
    setForm((f) => {
      return { ...f, [type]: value };
    });
  };
  const onLogin = async () => {
    setLoggingIn(true);
    let data = null;
    const { email, password } = form;
    if (!email || !password) {
      setError("Email and password should not be null.");
      return setLoggingIn(false);
    }
    data = await AuthService.login(email, password);
    if (typeof data !== "string") {
      return replace("/dashboard");
    }
    setError("Wrong email and/or password");
    setLoggingIn(false);
  };
  const disableButton = () => {
    const data = _.omit(form, ["remember"]);
    const errors = Object.values(data).filter((v) => !v);
    return errors.length > 0;
  };
  return (
    <div className="flex flex-1 bg-blue-20 h-screen">
      <div className="w-2/4 flex flex-col items-center space-y-5 pt-24">
        <div>
          <img src={LOGO_URL} alt="logo" className="h-24 w-24" />
        </div>
        <p>
          <span className="font-bold text-md">Welcome,</span>
          <br /> Enter your email and password to login.
        </p>
        <div className="flex flex-col">
          <Input
            className="w-full"
            onChange={(e) => onTextChange(e, "email")}
            placeholder="Email"
          />
          <Input
            onChange={(e) => onTextChange(e, "password")}
            placeholder="Password"
            type="password"
          />
          {/* <span className="block w-full">
            <Input
              onChange={(e) => onTextChange(e, "remember")}
              type="checkbox"
              className="border-0"
            />{" "}
            Remember me?
          </span> */}
          {hasErrors && (
            <ul>
              <li
                className="text-red-500 text-sm flex items-center"
                key={nanoid()}
              >
                <span className="rounded-full block h-2 w-2 mr-2 bg-red-500" />{" "}
                {error}
              </li>
            </ul>
          )}
          <Button
            disabled={disableButton()}
            className="w-full my-5 py-2 flex justify-center font-bold"
            onClick={onLogin}
            loading={loggingIn}
          >
            Login <LogIn className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
      <div className="w-full bg-login-img"></div>
    </div>
  );
};

export default Login;
