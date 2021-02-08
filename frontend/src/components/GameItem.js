import React from "react";
import { Link } from "react-router-dom";

const GameItem = ({ game }) => {
  const { name, description, image, _id, author } = game;

  return (
    <div className='card'>
      <img src={image} alt='game.name' />
      <h3>{name}</h3>
      <p>{description.substr(0, 70)}...</p>
      <p className='authGI'>
        <em>-Review by {author.substr(0, 10)}</em>
      </p>
      <Link to={`/games/${_id}`} className='btn btn-small'>
        See Game
      </Link>
    </div>
  );
};

export default GameItem;
