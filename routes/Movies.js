import {
  getAllMoviesUsingQuery,
  getMoviesUsingId,
  deleteMovieById,
  updateMovieById,
  addMovies,
} from "../Separate_Client_Function.js";
import { auth } from "../middleware/auth.js";
import express from "express";
const router = express.Router();
//movies route.............................................
// app.get("/movies", (req, res) => {
//   res.send(movies);
// });
// movies with id route (using request params)..............
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("ID is:", id);
  // const movie = movies.filter((mv) => mv.id == id);
  const movie = await getMoviesUsingId(id);
  movie
    ? res.send(movie)
    : res.status(404).send({ message: "Movie of particular id is not found" });
});
// movies with query(using request query)..................
router.get("/", auth, async (req, res) => {
  let { name, rating } = req.query;
  if (name || rating) {
    console.log(req.query);
  } else console.log("Movie list");
  // const movie = movies.filter((mv) => mv.id == id);
  // res.send(movies.filter((mv) => mv.name == name));
  // let filterMovies = movies;
  // if (name) {
  //   filterMovies = movies.filter((mv) => mv.name == name);
  // }
  // if (rating) {
  //   filterMovies = movies.filter((mv) => mv.rating == rating);
  // }
  // res.send(filterMovies);
  if (rating) {
    req.query.rating = +rating;
  }
  const movie = await getAllMoviesUsingQuery(req);
  res.send(movie);
});
// Delete Movie..............................................
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const movie = await deleteMovieById(id);
  movie
    ? res.send(movie)
    : res.status(404).send({ message: "Movie not found to delete" });
});
// Post Movie..............................................
router.post("/", async (req, res) => {
  const newMovies = req.body;

  const result = await addMovies(newMovies);
  result
    ? res.send(result)
    : res.status(404).send({ message: "Nothing on body to post" });
});
// Put Movie..............................................
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const updateMovie = req.body;
  console.log(req.params);
  const update = await updateMovieById(id, updateMovie);
  res.send(update);
});

export const movieRouter = router;
