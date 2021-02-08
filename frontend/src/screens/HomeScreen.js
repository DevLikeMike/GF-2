import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listGames } from "../actions/gameActions";
import GameItem from "../components/GameItem";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const gameList = useSelector((state) => state.gameList);
  const { loading: loadingGames, error: errorGames, games } = gameList;

  const gameCreate = useSelector((state) => state.gameCreate);
  const { success: successCreate } = gameCreate;

  useEffect(() => {
    dispatch(listGames());
  }, [dispatch, successCreate]);

  return (
    <div id='games-container'>
      {games && !loadingGames ? (
        <div className='card-cont'>
          {games &&
            games.map((game) => <GameItem key={game._id} game={game} />)}
        </div>
      ) : (
        <h3>loading...</h3>
      )}
    </div>
  );
};

export default HomeScreen;
