const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET ROUTE - sends complete list of tasks from DB to client
router.get('/', (req, res) => {
  const queryText = 'SELECT * FROM "todo";';

  pool
    .query(queryText)
    .then((dbResponse) => {
      console.log(dbResponse);
      res.send(dbResponse.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// POST ROUTE
router.post('/', (req, res) => {
  const todoData = req.body;
  const queryText = `INSERT INTO "todo" ("task", "status")
    VALUES ($1, 'false');`;

  const queryArray = [todoData.task];

  pool
    .query(queryText, queryArray)
    .then((dbResponse) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// UPDATE ROUTE

// DELETE ROUTE

module.exports = router;
