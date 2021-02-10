import React from "react";

const Message = ({ variant, children }) => {
  const Alert = ({ variant, children }) => {
    return (
      <div className='flex flex-center'>
        <div className={`alert-box ${variant} flex-center flex`}>
          {children}
        </div>
      </div>
    );
  };

  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: "light-blue",
};

export default Message;
