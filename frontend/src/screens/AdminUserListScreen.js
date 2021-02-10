import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, listUsers } from "../actions/userActions";
import Message from "../components/Message";

const AdminUserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete, error: errorDelete } = userDelete;

  const userList = useSelector((state) => state.userList);
  const { users, error: listError } = userList;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push("/");
    } else {
      if (users && users.length === 0) {
        dispatch(listUsers());
      }
    }
  }, [dispatch, history, userInfo, users, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you Sure you want to delete this user?")) {
      dispatch(deleteUser(id));
      dispatch(listUsers());
      history.push("/admin/users");
    }
  };

  return (
    <>
      <Link to='/' className='backBtn'>
        <i class='fas fa-chevron-left'></i> Home
      </Link>
      <div className='admin-page-container'>
        <h1 className='profile-page-header'>Registered Users</h1>
        {listError && <Message variant='danger'>{listError}</Message>}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>JOINED ON</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <i
                      className={
                        user.isAdmin ? "fas fa-check green" : "fas fa-times red"
                      }
                    ></i>
                  </td>
                  <td>{user.createdAt || user.date}</td>
                  <td>
                    <i
                      className='fas fa-trash delete'
                      onClick={() => deleteHandler(user._id)}
                    ></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminUserListScreen;
