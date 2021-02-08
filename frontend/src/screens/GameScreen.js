import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Bring in components
import Stars from "react-rating-stars-component";
// Actions
import { listGameDetails, deleteGame } from "../actions/gameActions";
import { GAME_DETAILS_RESET } from "../constants/gameConstants";

const GameScreen = ({ match, history }) => {
  // Declare states
  const gameId = match.params.id;
  const gameDelete = useSelector((state) => state.gameDelete);
  const { success: successDelete } = gameDelete;
  const gameDetails = useSelector((state) => state.gameDetails);
  const { loading, game } = gameDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  // Use Effect
  useEffect(() => {
    if (successDelete) {
      dispatch({ type: GAME_DETAILS_RESET });
      history.push("/");
    } else {
      dispatch(listGameDetails(gameId));
    }
  }, [match, gameId, dispatch, successDelete]);

  // Delete Handler
  const deleteHandler = (id) => {
    // Delete game if admin
    if (window.confirm("Are you sure? Once deleted there is no return!")) {
      dispatch(deleteGame(id));
    }
  };

  return (
    <>
      <Link to='/' className='backBtn'>
        <i class='fas fa-chevron-left'></i> Back
      </Link>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <h1 className='gameTitle text-center'>
            {game.name} - {game.platform}
          </h1>
          <div className='game-cont'>
            <div className='left-side'>
              <img src={game.image} alt={game.name} />
            </div>
            <div className='right-sided'>
              <p>{game.description}</p>
              <p className='authGP'>
                <em>-Revied submitted by {game.author}</em>
              </p>
              <Stars
                size='30'
                count='5'
                edit={false}
                isHalf='true'
                value={Number(game.rating)}
                color='#777'
                activeColor='#dea602'
                classNames='stars'
              />
              {userInfo._id === game.user && (
                <div className='buttonWrapper'>
                  <Link
                    to={`/games/${game._id}/edit`}
                    className='btn btn-small warning'
                  >
                    Edit Review
                  </Link>
                  <a
                    href='/games'
                    className='btn btn-small danger'
                    onClick={() => {
                      deleteHandler(game._id);
                    }}
                  >
                    Delete Review
                  </a>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default GameScreen;
