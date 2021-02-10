import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavItem = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <li className='nav-item' onClick={() => setOpen(!open)}>
      {props.location ? (
        <>
          <Link to={`/${props.location}`}>
            {props.icon && <i class={props.icon}></i>}
            <span className='nav-item-text'>{props.text}</span>
          </Link>
        </>
      ) : (
        <div className='dropbutton'>
          <i class={props.icon}></i>
          <span className='nav-item-text'>{props.text}</span>
        </div>
      )}
      {open && props.children}
    </li>
  );
};

export default NavItem;
