// Import and require modules
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'password',
    database: 'movie_db'
  },
  console.log(`Connected to the movie_db database.`)
);

app.get('/api/movies', (req, res) => {

  const sqlString = `SELECT id, movie_name as movie FROM movies`;
  db.query(sqlString, (err, results) =>{
      if(err){
          console.log(err);
          return;
      }
      else{
          res.json(results);
      }
  })
})

app.post('/api/add-movie', (req, res) =>
{
  const sqlString = `INSERT INTO movies (movie_name) VALUES (?)`;
  const movieAdd = (req.body.movie_name);

  db.query(sqlString, movieAdd, (err, results) =>{
    if(err){
      console.log(err);
      return;
  }
  else{
      console.log(`${movieAdd} successfully added to your database.`)
  }
  })
});

app.delete(`api/movie/:id`, (req, res)=>{
  const str = `DELETE `
})


app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);