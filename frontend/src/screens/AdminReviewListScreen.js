import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listGames, deleteGame } from "../actions/gameActions";

const AdminUserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const gameList = useSelector((state) => state.gameList);
  const { games } = gameList;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push("/");
    }
  }, [dispatch, history, userInfo, games]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure? Once deleted there is no return!")) {
      dispatch(deleteGame(id));
      dispatch(listGames());
      history.push("/admin/reviews");
    }
  };

  return (
    <>
      <Link to='/' className='backBtn'>
        <i class='fas fa-chevron-left'></i> Home
      </Link>
      <div className='admin-page-container'>
        <h1 className='profile-page-header'>Published Reviews</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>GAME</th>
              <th>AUTHOR</th>
              <th>DESCRIPTION</th>
              <th>RATING</th>
              <th>DATE CREATED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {games &&
              games.map((game) => (
                <tr>
                  <td>{game._id}</td>
                  <td>{game.name}</td>
                  <td>{game.author}</td>
                  <td>{game.description.substring(0, 144)}...</td>
                  <td>{game.rating}/5</td>
                  <td>{game.createdAt || game.date}</td>
                  <td>
                    <i
                      className='fas fa-trash delete'
                      onClick={() => deleteHandler(game._id)}
                    ></i>
                    <Link to={`/games/${game._id}`}>
                      <i
                        className='fas fa-external-link-alt'
                        style={{ color: "#4573e6" }}
                      ></i>
                    </Link>
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
