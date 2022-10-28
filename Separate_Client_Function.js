// const { client } = require("./index.js");
import { db1 } from "./index.js";

//....................................function module...............

export async function addMovies(newMovies) {
  return await db1.insertMany(newMovies);
}

export async function updateMovieById(id, updateMovie) {
  return await db1.updateOne({ id: id }, { $set: updateMovie });
}

export async function deleteMovieById(id) {
  return await db1.deleteOne({ id: id });
}

export async function getAllMoviesUsingQuery(req) {
  return await db1.find(req.query).toArray();
}

export async function getMoviesUsingId(id) {
  return await db1.findOne({ id: id });
}
