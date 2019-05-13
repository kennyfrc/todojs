// in charge of handling outputs
var todoList = {
  todos: [],
  // create a todoObject that's passed into a todos array
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  // you'll need to refer to a position that's embedded in the DOM
  // posiition is interchangeable with the ID
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  // delete based on an ID
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  // toggle completed based on position
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  // count completed then if all completed = all todos, then all false
  // if not, then toggle all as true
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;

    // Get number of completed todos.
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    
    this.todos.forEach(function(todo) {
      // Case 1: If everything's true, make everything false.
      if (completedTodos === totalTodos) {
        todo.completed = false;
      // Case 2: Otherwise, make everything true.
      } else {
        todo.completed = true;
      }
    });
  }
};

// in charge of handling inputs
// gets invoked in the HTML side
/* handlers take the document / element
/ add information on it
/ resets the input
/ renders it
*/ 
var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }  
};


// in charge of rendering
var view = {
  /* 
  / document object = The Document interface represents any web page loaded 
  / in the browser and serves as an entry point into the web page's content, 
  / which is the DOM tree
  / then
  / gets ul, adds li, adds () or (x),
  / adds the position on the id (so it can be updated/deleted later on)
  / adds the textContent
  / attaches the li to the ul
  / appends the li HTMLElement object to the todosUl HTMLElement object
  */ 
  displayTodos: function() {
    // returns the first Element within the document that matches the specified selector, or group of selectors
    // basically just <ul> </ul>
    var todosUl = document.querySelector('ul');
    // the above's todosUl.innerHTML is 'enter'. we are resetting it below to avoid any unintended bugs (we're not using it somewhere else)
    todosUl.innerHTML = ''; // why?
    
    /*
    / iterate over each todo and add the 1) elements
    / 2) the message
    / 3) the ID, text content so it can be handled later
    / 4) append it to the todosUl document
    */
    todoList.todos.forEach(function(todo, position) {
      // the document.createElement() method creates the HTML element specified by tagName, or an HTMLUnknownElement if tagName isn't recognized.
      var todoLi = document.createElement('li');
      // this is us initializing the display text
      var todoTextWithCompletion = '';

      if (todo.completed === true) {
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }
      
      // we need to add the position so that we can grab this via the eventhandlers later on
      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      // we passed the this (view) context so that we can call the createDeleteButton method
      todoLi.appendChild(this.createDeleteButton());
      // attach the Li to the Ul
      todosUl.appendChild(todoLi);
    }, this);
  },
  // just create a delete element
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  // set this up to listen for a delete click on the delete button
  setUpEventListeners: function() {
    var todosUl = document.querySelector('ul');
    
    todosUl.addEventListener('click', function(event) {
      // Get the element that was clicked on.
      var elementClicked = event.target;
      
      // Check if elementClicked is a delete button.
      if (elementClicked.className === 'deleteButton') {
        // if so, retrieve the ID then pass it to handlers.deleteTodo
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });    
  }
};

/* you need to create this specifically
/ for dynamically generated buttons like the delete button
/ otherwise, you don't need to set up an event lisener
*/
view.setUpEventListeners();
