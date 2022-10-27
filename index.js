const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
// import { MongoClient } from "mongodb";
// import express from "express";

const app = express();
const PORT = process.env.PORT;
// const movies = [
//   {
//     id: "1",
//     name: "GOT",
//     fullname: "Game of Thrones",
//     rating: 8.8,
//     image:
//       "https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg",
//     descrip:
//       "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
//     trailer: "https://www.youtube.com/embed/70V1aWbmlwo",
//   },
//   {
//     id: "2",
//     name: "Victorious",
//     fullname: "",
//     rating: 6.2,
//     image:
//       "https://www.themoviedb.org/t/p/original/4bXfaJXoiKOTPfb23Q9cuaNpE2x.jpg",
//     descrip:
//       "Aspiring singer Tori Vega navigates life while attending a performing arts high school called Hollywood Arts.",
//     trailer: "https://www.youtube.com/embed/FpLBDJw8iJI",
//   },
//   {
//     id: "3",
//     name: "Breaking Bad",
//     fullname: "",
//     rating: 8.5,
//     image:
//       "https://m.media-amazon.com/images/M/MV5BMTczMTY0MTMzOV5BMl5BanBnXkFtZTcwNDQxMTk4Nw@@._V1_.jpg",
//     descrip:
//       "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
//     trailer: "https://www.youtube.com/embed/lrcqbavlbyQ",
//   },
//   {
//     id: "4",
//     name: "Squid Game",
//     fullname: "",
//     rating: 8.0,
//     image:
//       "https://m.media-amazon.com/images/M/MV5BYWE3MDVkN2EtNjQ5MS00ZDQ4LTliNzYtMjc2YWMzMDEwMTA3XkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_FMjpg_UX1000_.jpg",
//     descrip:
//       "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits with deadly high stakes. A survival game that has a whopping 45.6 billion-won prize at stake.",
//     trailer: "https://www.youtube.com/embed/oqxAJKy0ii4",
//   },
//   {
//     id: "8",
//     name: "Money Heist",
//     fullname: "",
//     rating: 8.2,
//     image:
//       "https://m.media-amazon.com/images/M/MV5BODI0ZTljYTMtODQ1NC00NmI0LTk1YWUtN2FlNDM1MDExMDlhXkEyXkFqcGdeQXVyMTM0NTUzNDIy._V1_FMjpg_UX1000_.jpg",
//     descrip:
//       "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.",
//     trailer: "https://www.youtube.com/embed/_InqQJRqGW4",
//   },
//   {
//     id: "5",
//     name: "Harry Potter",
//     fullname: "",
//     rating: 7.6,
//     image:
//       "https://m.media-amazon.com/images/M/MV5BMzkyZGFlOWQtZjFlMi00N2YwLWE2OWQtYTgxY2NkNmM1NjMwXkEyXkFqcGdeQXVyNjY1NTM1MzA@._V1_.jpg",
//     descrip:
//       "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.",
//     trailer: "https://www.youtube.com/embed/nT_PxewbUpk",
//   },
//   {
//     id: "6",
//     name: "The Flash",
//     fullname: "",
//     rating: 7.6,
//     image:
//       "https://m.media-amazon.com/images/M/MV5BMDIzNzYwNTctZWY4Mi00YjQ2LWI5YWYtMzdmNDgwMGI4Yzk1XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
//     descrip:
//       "After being struck by lightning, Barry Allen wakes up from his coma to discover he's been given the power of super speed, becoming the Flash, and fighting crime in Central City.",
//     trailer: "https://www.youtube.com/embed/Yj0l7iGKh8g",
//   },
//   {
//     id: "7",
//     name: "Strange Things",
//     fullname: "",
//     rating: 8.0,
//     image:
//       "https://m.media-amazon.com/images/M/MV5BMDRjYWI5NTMtZTYzZC00NTg4LWI3NjMtNmI3MTdhMWQ5MGJlXkEyXkFqcGdeQXVyNTg4MDc4Mg@@._V1_FMjpg_UX1000_.jpg",
//     descrip:
//       "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
//     trailer: "https://www.youtube.com/embed/hyEWvTUCLQo",
//   },
//    {
//     id: "9",
//     name: "Zootopia",
//     fullname: "",
//     rating: 8.0,
//     image:
//       "https://m.media-amazon.com/images/M/MV5BOTMyMjEyNzIzMV5BMl5BanBnXkFtZTgwNzIyNjU0NzE@._V1_.jpg",
//     descrip:
//       "In a city of anthropomorphic animals, a rookie bunny cop and a cynical con artist fox must work together to uncover a conspiracy.",
//    trailer:"https://www.youtube.com/embed/jWM0ct-OLsM",
//   },
//   {
//     id: "10",
//     name: "Toy Story(1995)",
//     fullname: "",
//     rating: 8.3,
//     image:
//       "https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_.jpg",
//     descrip:
//       "A cowboy doll is profoundly threatened and jealous when a new spaceman action figure supplants him as top toy in a boy's bedroom.",
//     trailer: "https://www.youtube.com/embed/rNk1Wi8SvNc",
//   },
// ];

app.get("/", (req, res) => {
  res.send("Hello Everyone");
});
app.use(express.json());
// mongodb...............
const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);

// const dbName = "b35we";
async function createConnection() {
  await client.connect();
  console.log("monogo is connected");
  // const db = client.db(dbName);
  // const collection = db.collection("movies");
  return "done.";
}
createConnection();

//movies route.............................................
// app.get("/movies", (req, res) => {
//   res.send(movies);
// });
// movies with id route (using request params)..............
app.get("/movies/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  // const movie = movies.filter((mv) => mv.id == id);
  const movie = await client
    .db("b35we")
    .collection("movies")
    .findOne({ id: id });
  movie
    ? res.send(movie)
    : res.status(404).send({ message: "Movie not found" });
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
//.............................................................
app.listen(PORT, () => {
  console.log("PORT IS", PORT);
});
