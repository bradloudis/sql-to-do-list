$(document).ready(readyUp);

function readyUp() {
  console.log('js and JQ - up and running!');
  $('#js-addBtn').on('click', handleClickAdd);
  $('.js-taskTable').on('click', '.js-deleteBtn', handleClickDelete);
  getTasks();
}

function handleClickAdd() {
  const taskObj = {
    task: $('#js-task').val(),
  };
  postTask(taskObj);
}

function handleClickDelete() {
  const taskId = $(this).data('id');
  // console.log('DELETE', taskId);
  deleteTask(taskId);
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

// DELETE takes the id from the delete btn and removes that specific task from the DB
function deleteTask(taskId) {
  $.ajax({
    type: 'DELETE',
    url: `/todo/${taskId}`,
  })
    .then((deleteMsg) => {
      // DB is updated, need to update DOM
      getTasks();
    })
    .catch((err) => {
      console.log(err);
      alert('whoopsie daisy!');
    });
}

function render(response) {
  $('.js-taskTable').empty();
  for (let task of response) {
    $('.js-taskTable').append(`
      <tr>
        <td>${task.task}</td>
        <td><button>Mark Complete</button></td>
        <td><button class="js-deleteBtn" data-id="${task.id}">Delete</button></td>
      </tr>
    `);
  }
}
