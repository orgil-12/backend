const express = require("express");
const fs = require("node:fs");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/movies", (req, res) => {
  const data = fs.readFileSync("data/movies.json", "utf8");
  const movies = JSON.parse(data);
  res.json(movies);
});

app.get("/movies/create", (req, res) => {
  const { query } = req;
  //1. read json from file
  const data = fs.readFileSync("data/movies.json", "utf8");
  const movies = JSON.parse(data);

  //2. push to json array
  movies.push({ id: Date.now(), name: query.name });

  //3. write json to string

  const moviesString = JSON.stringify(movies, null, 4);
  fs.writeFileSync("data/movies.json", moviesString);

  res.json({ message: "Success" });
});

app.get("/movies/update", (req, res) => {
  const { query } = req;
  const data = fs.readFileSync("data/movies.json", "utf-8");
  const movies = JSON.parse(data);
  const movieIndex = movies.findIndex((movie) => movie.id === Number(query.id));
  movies[movieIndex] = { id: Number(query.id), name: query.updateName };
  const moviesString = JSON.stringify(movies, null, 4);
  fs.writeFileSync("data/movies.json", moviesString);
  res.json({ message: "Updated" });
});

app.get("/movies/delete", (req, res) => {
  const { query } = req;
  const data = fs.readFileSync("data/movies.json", "utf-8");
  const movies = JSON.parse(data);
  const movieIndex = movies.findIndex((movie) => movie.id === Number(query.id));
  movies.splice(movieIndex, 1);
  const moviesString = JSON.stringify(movies, null, 4);
  fs.writeFileSync("data/movies.json", moviesString);
  res.json({ message: "Deleted" });
});

app.get("/movies/detail", (req, res) => {
  const { query } = req;
  const data = fs.readFileSync("data/movies.json", "utf-8");
  const movies = JSON.parse(data);
  const movie = movies.find((movie) => movie.id === Number(query.id));
  res.json(movie);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
