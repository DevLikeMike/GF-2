import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// Component imports
import NavItem from "./NavItem";
import AdminDropdownMenu from "./AdminDropdownMenu";
import ProfileDropdownMenu from "./ProfileDropdownMenu";
// Actions
import { logout } from "../../actions/userActions";
import { GAME_CREATE_RESET } from "../../constants/gameConstants";
import { USER_LIST_RESET } from "../../constants/userConstants";

const Header = (props) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    dispatch({ type: GAME_CREATE_RESET });
    dispatch({ type: USER_LIST_RESET });
  };

  return (
    <nav>
      <div id='logo-block'>
        <Link to={userInfo ? "/" : "/login"}>
          <h1 id='nav-title'>
            <i className={props.icon} />{" "}
            <span id='title-text'>
              <span id='gamer'>Gamer</span>Facts
            </span>
          </h1>
        </Link>
      </div>
      <ul className='nav-links'>
        {userInfo ? (
          <>
            <NavItem icon='fas fa-user-cog' text={`${userInfo.name}`}>
              <ProfileDropdownMenu />
            </NavItem>
            {userInfo.isAdmin && (
              <>
                <NavItem icon='fas fa-user-cog' text='Admin'>
                  <AdminDropdownMenu />
                </NavItem>
              </>
            )}
            <li className='nav-item'>
              <a href='/' onClick={logoutHandler}>
                <i className='fas fa-sign-out-alt'></i>Sign Out
              </a>
            </li>
          </>
        ) : (
          <>
            <li className='nav-item'>
              <Link to='/login'>Login</Link>
            </li>
            <li className='nav-item'>
              <Link to='/register'>Register</Link>
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
