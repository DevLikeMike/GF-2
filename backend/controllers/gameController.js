import asyncHandler from "express-async-handler";
import Game from "../models/gameModel.js";

// @description  Get all games
// @route        GET /api/games
// @access       Public
const getGames = asyncHandler(async (req, res) => {
  const games = await Game.find({}).sort({ date: -1 });

  res.json(games);
});

// @description  Get single game
// @route        GET /api/games/:id
// @access       Public
const getGameById = asyncHandler(async (req, res) => {
  const game = await Game.findById(req.params.id);

  if (game) {
    res.json(game);
  } else {
    res.status(404);
    throw new Error("Game Not Found");
  }
});

// @description  Create a new game
// @route        POST /api/games/
// @access       Private
const createNewReview = asyncHandler(async (req, res) => {
  const { name, author, image, rating, description, platform } = req.body;

  const createdReview = await Game.create({
    name,
    author,
    image,
    description,
    platform,
    rating,
    user: req.user._id,
  });

  if (createdReview) {
    res.status(201).json({
      _id: createdReview._id,
      name: createdReview.name,
      author: createdReview.author,
      user: createdReview.user,
      platform: createdReview.platform,
      rating: createdReview.rating,
      date: createdReview.date,
      description: createdReview.description,
      image: createdReview.image,
    });
  } else {
    res.status(400);
    throw new Error("Invalid game data");
  }
});

// @description  Update game review
// @route        PUT /api/games/:id
// @access       Private
const updateUsersGame = asyncHandler(async (req, res) => {
  const game = await Game.findById(req.params.id);

  if (game) {
    if (game.user == req.user.id) {
      game.name = req.body.name || game.name;
      game.description = req.body.description || game.description;
      game.platform = req.body.platform || game.platform;
      game.image = req.body.image || game.image;
      game.rating = req.body.rating || game.rating;

      const updatedGame = await game.save();

      res.json({
        _id: updatedGame._id,
        name: updatedGame.name,
        author: updatedGame.author,
        user: updatedGame.user,
        platform: updatedGame.platform,
        rating: updatedGame.rating,
        date: updatedGame.date,
        description: updatedGame.description,
        image: updatedGame.image,
      });
    } else {
      res.status(500);
      throw new Error("User not authorized");
    }
  } else {
    res.status(404);
    throw new Error("Game Not Found");
  }
});

// @description  Delete game review
// @route        DELETE /api/games/:id
// @access       Private
const deleteUsersGame = asyncHandler(async (req, res) => {
  const game = await Game.findById(req.params.id);

  if (game) {
    if (game.user == req.user.id) {
      await game.remove();

      res.json({
        message: "Game Removed",
      });
    } else {
      res.status(500);
      throw new Error("User not authorized");
    }
  } else {
    res.status(404);
    throw new Error("Game Not Found");
  }
});

export {
  getGames,
  getGameById,
  createNewReview,
  updateUsersGame,
  deleteUsersGame,
};
