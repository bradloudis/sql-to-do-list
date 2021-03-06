const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET ROUTE - sends complete list of tasks from DB to client
router.get('/', (req, res) => {
  const queryText = 'SELECT * FROM "todo" ORDER BY "id";';

  pool
    .query(queryText)
    .then((dbResponse) => {
      // console.log(dbResponse);
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
// PUT
router.put('/status/:id', (req, res) => {
  const newTaskInfo = req.body;
  const queryText = `UPDATE "todo" SET status=$1 WHERE id=$2;`;
  const queryArray = [newTaskInfo.status, req.params.id];

  pool
    .query(queryText, queryArray)
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.warning(err);
      res.sendStatus(500);
    });
});

// DELETE ROUTE
router.delete('/:id', (req, res) => {
  const taskId = req.params.id;
  const queryText = `DELETE FROM "todo" WHERE id=$1;`;
  const queryArrayData = [taskId];

  pool
    .query(queryText, queryArrayData)
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
