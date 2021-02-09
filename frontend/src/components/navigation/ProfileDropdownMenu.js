import React from "react";
import { Link } from "react-router-dom";

const ProfileDropdownMenu = () => {
  const DropdownItem = (props) => {
    return (
      <Link to={`/${props.location}`} class='menu-item'>
        <span className='icon-button'>
          <i className={`${props.icon}`}></i>
        </span>
        <span className='admin-span'>{props.children}</span>
      </Link>
    );
  };

  return (
    <div className='dropdown-menu'>
      <DropdownItem location='newgame' icon='fas fa-plus'>
        New Review
      </DropdownItem>
      <DropdownItem location='myprofile' icon='fas fa-user'>
        My Profile
      </DropdownItem>
    </div>
  );
};

export default ProfileDropdownMenu;
