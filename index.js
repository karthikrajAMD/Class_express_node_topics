const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
// import { MongoClient } from "mongodb";
// import express from "express";

const app = express();

const PORT = process.env.PORT;

// mongodb...............
const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);
// const dbName = "b35we";
async function createConnection() {
  await client.connect();
  console.log("monogodb is connected");
  // const db = client.db(dbName);
  // const collection = db.collection("movies");
  return "done.";
}
createConnection();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello Everyone");
});
//movies route.............................................
// app.get("/movies", (req, res) => {
//   res.send(movies);
// });
// movies with id route (using request params)..............
app.get("/movies/:id", async (req, res) => {
  const { id } = req.params;
  console.log("ID is:", id);
  // const movie = movies.filter((mv) => mv.id == id);
  const movie = await client
    .db("b35we")
    .collection("movies")
    .findOne({ id: id });
  movie
    ? res.send(movie)
    : res.status(404).send({ message: "Movie of particular id is not found" });
});
// movies with query(using request query)..................
app.get("/movies", async (req, res) => {
  let { name, rating } = req.query;
  console.log(req.query, name, rating);
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
  const movie = await client
    .db("b35we")
    .collection("movies")
    .find(req.query)
    .toArray();
  res.send(movie);
});
// Delete Movie..............................................
app.delete("/movies/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const movie = await client
    .db("b35we")
    .collection("movies")
    .deleteOne({ id: id });
  movie
    ? res.send(movie)
    : res.status(404).send({ message: "Movie not found to delete" });
});
// Post Movie..............................................
app.post("/movies", async (req, res) => {
  const newMovies = req.body;

  const result = await client
    .db("b35we")
    .collection("movies")
    .insertMany(newMovies);
  result
    ? res.send(result)
    : res.status(404).send({ message: "Nothing on body to post" });
});
// Put Movie..............................................
app.put("/movies/:id", async (req, res) => {
  const { id } = req.params;

  const updateMovie = req.body;
  console.log(req.params);
  const update = await client
    .db("b35we")
    .collection("movies")
    .updateOne({ id: id }, { $set: updateMovie });

  res.send(update);
  // updateMovie
  //   ? res.send(update)
  //   : res.status(404).send({ message: "Nothing on body to update" });
});
//.............................................................
app.listen(PORT, () => {
  console.log("PORT IS", PORT);
});
