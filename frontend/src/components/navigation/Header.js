import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// Component imports
import NavItem from "./NavItem";
import AdminDropdownMenu from "./AdminDropdownMenu";
// Action
import { logout } from "../../actions/userActions";
import { GAME_CREATE_RESET } from "../../constants/gameConstants";

const Header = (props) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    dispatch({ type: GAME_CREATE_RESET });
  };

  return (
    <nav>
      <div id='logo-block'>
        <Link to={userInfo ? "/" : "/login"}>
          <h1 id='nav-title'>
            <i className={props.icon} /> <span id='title-text'>GamerFacts</span>
          </h1>
        </Link>
      </div>
      <ul className='nav-links'>
        {userInfo ? (
          <>
            <li id='greeting' className='nav-item'>
              Welcome <span id='greetingName'>{userInfo.name}</span>
            </li>
            {userInfo.isAdmin && (
              <>
                <NavItem icon='fas fa-user-cog' text='Admin'>
                  <AdminDropdownMenu />
                </NavItem>
              </>
            )}
            <NavItem icon='fas fa-plus' location='newgame' text='New Review' />
            <li className='nav-item'>
              <a onClick={logoutHandler} href='/'>
                <i className='fas fa-sign-out-alt'></i>
                <span>Logout</span>
              </a>
            </li>
          </>
        ) : (
          <>
            <NavItem location={"login"} text={"Login"} />
            <NavItem location={"register"} text={"Register"} />
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
