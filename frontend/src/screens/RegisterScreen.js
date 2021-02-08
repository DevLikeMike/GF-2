import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";

const RegisterScreen = ({ location, history }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

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
    if (password !== password2) {
      alert("Passwords do not match");
    } else {
      if (email === "" || password === "" || name === "") {
        alert("Please enter a name, email, and password.");
      } else {
        dispatch(register(email, password, name));
      }
    }
  };

  return (
    <>
      <div className='form-wrapper flex flex-center col'>
        <h1 className='authHeader'>Register New Account</h1>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              name='name'
              placeholder='Enter your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete='off'
            />
          </div>

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

          <div className='form-group'>
            <input
              type='password'
              name='password2'
              placeholder='Confirm your password'
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>

          <input type='submit' value='Sign Up' className='btn' />
        </form>
        <p>
          Already have an account?{" "}
          <Link to='/login' className='text-center'>
            Login!
          </Link>
        </p>
      </div>
    </>
  );
};

export default RegisterScreen;
