import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, getUserDetails, listUsers } from "../actions/userActions";

const AdminUserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push("/");
    } else {
      if (users && users.length == 0) {
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
                <tr>
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
