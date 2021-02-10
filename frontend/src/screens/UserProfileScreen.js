import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyGames } from "../actions/gameActions";
import Message from "../components/Message";
import Spinner from "../components/Spinner";

const UserProfileScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const gameListMy = useSelector((state) => state.gameListMy);
  const { loading: gameListLoading, error: gameListError, games } = gameListMy;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (success) {
      dispatch(getUserDetails);
    } else {
      if (!userInfo) {
        history.push("/login");
      } else {
        if (!user.name) {
          dispatch(getUserDetails("profile"));
        } else {
          setName(user.name);
          setEmail(user.email);
          dispatch(listMyGames(user._id));
        }
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      // Dispatch updated profile
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <>
      <Link to='/' className='backBtn'>
        <i class='fas fa-chevron-left'></i> Back
      </Link>
      {error && <Message variant='danger'>{error}</Message>}
      {gameListError && <Message variant='danger'>{gameListError}</Message>}
      <div className='page-container'>
        <h1 className='profile-page-header'>User Profile</h1>
        {loading || gameListLoading ? (
          <Spinner />
        ) : (
          <>
            <div className='user-info-form'>
              <form onSubmit={submitHandler} autocomplete='off'>
                <div className='profile-form-group'>
                  <label htmlFor='name'>Name</label>
                  <input
                    autocomplete='off'
                    type='text'
                    name='name'
                    placeholder='Enter your name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className='profile-form-group'>
                  <label htmlFor='email'>Email</label>
                  <input
                    autocomplete='off'
                    type='email'
                    name='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className='profile-form-group'>
                  <label htmlFor='password'>Password</label>
                  <input
                    type='password'
                    name='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className='profile-form-group'>
                  <label htmlFor='confirmPassword'>Confirm Password</label>
                  <input
                    type='password'
                    placeholder='Enter password'
                    name='confirmPassword'
                    value={password}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <input type='submit' value='Submit' class='profile-submit' />
              </form>
            </div>
            <div className='user-assets'>
              <h2>Reviews</h2>
              <table>
                <thead>
                  <tr>
                    <th>GAME</th>
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
                        <td>{game.name}</td>
                        <td>{game.description.substring(0, 144)}...</td>
                        <td>{game.rating}/5</td>
                        <td>{game.date.substring(0, 10)}</td>
                        <td>
                          <Link to={`/games/${game._id}`}>
                            <i className='fas fa-external-link-alt'></i>
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <h2>Comments</h2>
              <table>
                <thead>
                  <tr>
                    <th>GAME</th>
                    <th>COMMENT</th>
                    <th>DATE</th>
                  </tr>
                </thead>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserProfileScreen;
