import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGame } from "../actions/gameActions";
import Stars from "react-rating-stars-component";

const CreateGameScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [platform, setPlatform] = useState("");
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    setAuthor(userInfo.name);
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      name !== "" ||
      author !== "" ||
      platform !== "" ||
      description !== "" ||
      image !== ""
    ) {
      dispatch(createGame(name, author, image, description, platform, rating));
      history.push("/");
    } else {
      alert("Please fill out all form fields");
    }
  };

  return (
    <>
      <div className='form-wrapper flex flex-center col'>
        <h1 id='newGameHeader'>New Game Review</h1>
        <form onSubmit={submitHandler}>
          <div className='form-group'>
            <input
              type='text'
              name='name'
              placeholder='Please enter the name of the game'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete='off'
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              name='image'
              placeholder='Please paste a url to the cover art...'
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>

          <select name='platform' onChange={(e) => setPlatform(e.target.value)}>
            <option value='' defaultValue>
              Select Console
            </option>
            <option value='PC'>PC</option>
            <option value='XBOX'>Xbox</option>
            <option value='Playstation'>Playstation</option>
            <option value='Nintendo'>Nintendo</option>
          </select>

          <h3>Please enter your review here...</h3>
          <div className='form-group' id='description'>
            <textarea
              type='textArea'
              name='description'
              placeholder=''
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <h3 className='text-center'>Please Rate Your Game</h3>
          <Stars
            size='30'
            count='5'
            isHalf='true'
            value={rating}
            color='#777'
            activeColor='#dea602'
            onChange={(newvalue) => setRating(newvalue)}
            classNames='stars'
          />
          <input type='submit' value='Submit New Game' />
        </form>
      </div>
    </>
  );
};

export default CreateGameScreen;
