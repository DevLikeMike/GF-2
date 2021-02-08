import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../actions/userActions";

const LoginScreen = ({ location, history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Please enter both EMAIL and PASSWORD", "danger");
    } else {
      dispatch(login(email, password));
    }
  };

  return (
    <>
      <div className='form-wrapper flex flex-center col'>
        <h1 className='authHeader'>Account Login</h1>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              name='email'
              placeholder='Enter your Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete='off'
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              name='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input type='submit' value='Login' className='btn' />
        </form>
        <p>
          Don't have an account?{" "}
          <Link to='/register' className='text-center'>
            Sign Up!
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginScreen;
