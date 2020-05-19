import React, {useState} from 'react';
import './App.css';

// The todo component
// todo and index is passed in 
// outputs the text field from todo 
function Todo({ todo, index,completeTodo, removeTodo}){
  return(
    <div className="todo" style={{textDecoration: todo.isCompleted ? 'line-through' : ''}}>
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>x</button>
        </div>
    </div>
  )
}

// form for adding todos
function TodoForm({addTodo}){
  const [value, setValue] = useState('');

  // when form submited, fire off the addTodo function and pass the value to it
  const handleSubmit = e => {
    e.preventDefault();
    if(!value) return;
    addTodo(value);
    setValue('');
  }

  return(
    <form onSubmit={handleSubmit}>
      <input 
      type="text" 
      className="input" 
      value={value} 
      onChange={e => setValue(e.target.value)}
      placeholder="add a new todo"
      >
      
      </input>
    </form>
  )
}

function App() {

  // creating a state called todos and assigning values 
  // the setTodos is a function which can be used to update todos
  const [todos, setTodos] = useState([
    {
      text: 'Learn about React',
      isCompleted: false
    },
    {
      text: 'Meet mates at the pub',
      isCompleted: false
    },
    {
      text: 'Build react website',
      isCompleted: false
    }

  ]);

  // function which updates the todos list
  // it takes in the text passed down from the form
  // then it creates a new todos list with the new added todo
  // finally it sets the todos to the new list
  const addTodo = text => {
    const NewTodos = [...todos, { text }];
    setTodos(NewTodos);
  }

  // function which marks a todo complete
  // takes in index 
  const completeTodo = index => {
    const NewTodos =[...todos];
    NewTodos[index].isCompleted = true;
    setTodos(NewTodos);
  }

  // function to delete todos
  const removeTodo = index => {
    const NewTodos =[...todos];
    NewTodos.splice(index, 1);
    setTodos(NewTodos);
  }

  // returning what we want to display
  // todo list itirates through all todos and outputs each one
  return(
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) =>(
          <Todo 
          key={index} 
          index={index} 
          todo={todo} 
          completeTodo={completeTodo}
          removeTodo ={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  )

}

export default App;