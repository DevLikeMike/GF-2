import axios from "axios";
import {
  GAME_CREATE_FAIL,
  GAME_CREATE_REQUEST,
  GAME_CREATE_SUCCESS,
  GAME_DELETE_FAIL,
  GAME_DELETE_REQUEST,
  GAME_DELETE_SUCCESS,
  GAME_DETAILS_FAIL,
  GAME_DETAILS_REQUEST,
  GAME_DETAILS_SUCCESS,
  GAME_LIST_FAIL,
  GAME_LIST_REQUEST,
  GAME_LIST_SUCCESS,
  GAME_UPDATE_FAIL,
  GAME_UPDATE_REQUEST,
  GAME_UPDATE_SUCCESS,
} from "../constants/gameConstants";

export const listGames = () => async (dispatch) => {
  try {
    //Dispatch request for all games
    dispatch({
      type: GAME_LIST_REQUEST,
    });

    // Axios request for all games
    const { data } = await axios.get(`/api/games`);

    // Dispatch successful games list
    dispatch({
      type: GAME_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GAME_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listGameDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GAME_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/games/${id}`);

    dispatch({
      type: GAME_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GAME_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createGame = (
  name,
  author,
  image,
  description,
  platform,
  rating
) => async (dispatch, getState) => {
  try {
    dispatch({ type: GAME_CREATE_REQUEST });

    const game = {
      name,
      author,
      image,
      description,
      platform,
      rating,
    };

    const {
      userLogin: { userInfo },
    } = getState();

    //Axios config
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/games`, game, config);

    dispatch({
      type: GAME_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GAME_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateGame = (game) => async (dispatch, getState) => {
  try {
    //Dispatch the product update
    dispatch({
      type: GAME_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    //Axios config
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Axios request for new sample product to be updated
    const { data } = await axios.put(`/api/games/${game._id}`, game, config);

    dispatch({
      type: GAME_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GAME_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteGame = (id) => async (dispatch, getState) => {
  try {
    //Dispatch the product delete request
    dispatch({
      type: GAME_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    //Axios config
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Axios request with user submited data to logn
    await axios.delete(`/api/games/${id}`, config);

    dispatch({
      type: GAME_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: GAME_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
