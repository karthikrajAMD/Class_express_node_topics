// const express = require("express");
// const { MongoClient } = require("mongodb");
// require("dotenv").config();
import { MongoClient } from "mongodb";
import express from "express";
import * as dotenv from "dotenv";
import { movieRouter } from "./routes/Movies.js";
import { userRouter } from "./routes/Users.js";

dotenv.config();
export const app = express();

const PORT = process.env.PORT;

// mongodb...............
const MONGO_URL = process.env.MONGO_URL;
export const client = new MongoClient(MONGO_URL);
export const db1 = client.db("b35we").collection("movies");
export const db2 = client.db("b35we").collection("users");

async function createConnection() {
  await client.connect();
  console.log("monogodb is connected");
  // const db = client.db(dbName);
  // const collection = db.collection("movies");
  return "done.";
  // return client;
}
createConnection();
// export const client = await createConnection();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello Everyone");
});
//....................Route Path...............................
app.use("/movies", movieRouter);
app.use("/users", userRouter);
//.............................................................
app.listen(PORT, () => {
  console.log("PORT IS", PORT);
});
