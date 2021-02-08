import React from "react";
import { Link } from "react-router-dom";

const AdminDropdownMenu = () => {
  const DropdownItem = (props) => {
    return (
      <Link to={`/admin/${props.location}`} class='menu-item'>
        <span className='icon-button'>
          <i className='fas fa-user-cog'></i>
        </span>
        <span className='admin-span'>{props.children}</span>
      </Link>
    );
  };

  return (
    <div className='dropdown-menu'>
      <DropdownItem location='users'>Users</DropdownItem>
      <DropdownItem location='reviews'>Reviews</DropdownItem>
      <DropdownItem location='comments'>Comments</DropdownItem>
    </div>
  );
};

export default AdminDropdownMenu;
