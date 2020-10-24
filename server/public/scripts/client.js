$(document).ready(readyUp);

function readyUp() {
  console.log('js and JQ - up and running!');
  $('#js-addBtn').on('click', handleClickAdd);
  getTasks();
}

function handleClickAdd() {
  const taskObj = {
    task: $('#js-task').val(),
  };
  postTask(taskObj);
}

// API CALLS BELOW HERE
// ---------------------------

// POST sends object to be added to DB
function postTask(taskObj) {
  $.ajax({
    type: 'POST',
    url: '/todo',
    data: taskObj,
  })
    .then(function (response) {
      //database is updated, need to update DOM
      getTasks();
    })
    .catch(function (err) {
      console.log(err);
      alert('Something went wrong in POST');
    });
}

// GET receives tasks from the DB to update on the DOM
function getTasks() {
  $.ajax({
    method: 'GET',
    url: '/todo',
  })
    .then(function (response) {
      render(response);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function render(response) {
  $('.js-taskTable').empty();
  for (let task of response) {
    $('.js-taskTable').append(`
      <tr>
        <td>${task.task}</td>
        <td><button>Mark Complete</button></td>
        <td><button>Delete</button></td>
      </tr>
    `);
  }
}
