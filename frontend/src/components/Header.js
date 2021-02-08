import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// Action
import { logout } from "../actions/userActions";
import { GAME_CREATE_RESET } from "../constants/gameConstants";

const Header = ({ icon }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    dispatch({ type: GAME_CREATE_RESET });
  };

  return (
    <nav>
      <Link to={userInfo ? "/" : "/login"}>
        <h1 id='nav-title'>
          <i className={icon} /> <span id='title-text'>GamerFacts</span>
        </h1>
      </Link>
      <ul className='nav-links'>
        {userInfo ? (
          <>
            <li id='greeting'>
              Welcome <span id='greetingName'>{userInfo.name}</span>
            </li>
            <li>
              <a href='/newgame'>
                <i className='fas fa-plus'></i>
                New Review
              </a>
            </li>
            <li>
              <a onClick={logoutHandler} href='/'>
                <i className='fas fa-sign-out-alt'></i>
                <span>Logout</span>
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/register'>Register</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Header.defaultProps = {
  title: "GamerFacts",
  icon: "fas fa-gamepad",
};

export default Header;
