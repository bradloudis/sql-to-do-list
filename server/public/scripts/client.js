$(document).ready(readyUp);

function readyUp() {
  console.log('js and JQ - up and running!');
  $('#js-addBtn').on('click', handleClickAdd);
  $('.js-taskTable').on('click', '.js-deleteBtn', handleClickDelete);
  $('.js-taskTable').on('click', '.js-completeBtn', handleClickComplete);
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
  console.log(taskId);
  // deleteTask(taskId);
}

function handleClickComplete() {
  const taskId = $(this).data('id');
  let taskStatus = $(this).data('status');
  if (taskStatus) {
    taskStatus = false;
  } else {
    taskStatus = true;
  }
  console.log(taskId, taskStatus);
  completeTask(taskId, taskStatus);
}

function clearInput() {
  $('#js-task').val('');
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
      clearInput();
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

// DELETE takes the id from the 'delete' btn and removes that specific task from the DB
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

// PUT takes the id from the 'Mark Complete' btn and updates that specific task on the DB
function completeTask(id, status) {
  $.ajax({
    method: 'PUT',
    url: `/todo/status/${id}`,
    data: { status: status },
  })
    .then(() => {
      getTasks();
    })
    .catch((err) => {
      console.log(err);
      alert('Could not update data');
    });
}

// UPDATE THE DOM!
// ------------------------
function render(response) {
  $('.js-taskTable').empty();
  for (let task of response) {
    if (task.status) {
      $('.js-taskTable').append(`
        <tr>
          <td class="completedTask">${task.task}</td>
          <td><button class="js-completeBtn" data-id="${task.id}" data-status="${task.status}">Mark Incomplete</button></td>
          <td><button class="js-deleteBtn" data-id="${task.id}">Delete</button></td>
        </tr>
      `);
    } else {
      $('.js-taskTable').append(`
        <tr>
          <td>${task.task}</td>
          <td><button class="js-completeBtn" data-id="${task.id}" data-status="${task.status}">Mark Complete</button></td>
          <td><button class="js-deleteBtn" data-id="${task.id}">Delete</button></td>
        </tr>
      `);
    }
    // if (task.status) {
    //   const completedTask = task.task;
    //   console.log(completedTask, 'complete!');
    //   // completedTask.addClass('completedTask');
    // }
  }
}
