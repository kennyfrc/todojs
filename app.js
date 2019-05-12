var todoList = {
 todos: [],
 add: function(todo) {
   this.todos.push(todo);
   this.view();
 },
 delete: function(pos) {
  this.todos.splice(pos,1); 
  this.view();
 },
 edit: function(pos, newText) {
  this.todos[pos] = newText;
  this.view();
 },
 view: function(){
  this.todos.forEach(function(e,i) {
    console.log(i, e);
  })
 }
};