const express = require("express");
const { error } = require("node:console");
const fs = require("node:fs");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/movies", (req, res) => {
  const data = fs.readFileSync("data/movies.json", "utf8");
  const movies = JSON.parse(data);
  res.json(movies);
});

app.post("/movies", (req, res) => {
  const { body } = req;
  console.log(body)
  const data = fs.readFileSync("data/movies.json", "utf8");
  const movies = JSON.parse(data);

  movies.push({ id: Date.now(), ...body });

  const moviesString = JSON.stringify(movies, null, 4);
  fs.writeFileSync("data/movies.json", moviesString);

  res.json({ message: "Success" });
});

app.put("/movies/:id", (req, res) => {
  const {body,params} = req

  const data = fs.readFileSync("data/movies.json", "utf-8");
  const movies = JSON.parse(data);

  const movieIndex = movies.findIndex((movie) => movie.id === Number(params.id));

  if (movieIndex >= 0) {
    movies[movieIndex] = { id: Number(params.id), ...movies[movieIndex],  ...body };
  } else return res.status(400).json({ error: "Cannot find this id" });

  const moviesString = JSON.stringify(movies, null, 4);
  fs.writeFileSync("data/movies.json", moviesString);

  res.json({ message: "Updated" });
});

app.delete("/movies/:id", (req, res) => {
  const { params } = req;
  const data = fs.readFileSync("data/movies.json", "utf-8");
  const movies = JSON.parse(data);
  const movieIndex = movies.findIndex((movie) => movie.id === Number(params.id));
  if (movieIndex >= 0) {
    movies.splice(movieIndex, 1);
  } else return res.status(400).json({ error: "Cannot find this id" });
  const moviesString = JSON.stringify(movies, null, 4);
  fs.writeFileSync("data/movies.json", moviesString);
  res.json({ message: "Deleted" });
});

app.get("/movies/:id", (req, res) => {
  const { params } = req;
  const data = fs.readFileSync("data/movies.json", "utf-8");
  const movies = JSON.parse(data);
  const movie = movies.find((movie) => movie.id === Number(params.id));
  if (movie) {
    res.json(movie);
  } else return res.status(400).json({ error: "Cannot find this id" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
