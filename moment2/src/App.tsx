import { useState } from 'react';
import './App.css';
import Todos from './components/Todos';

interface Todo {
  _id: string;
  title: string;
  desc: string;
  status: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <main>
      <h1>Todo App</h1>
      {/* Skickar `todos` och `setTodos` till `Todos.tsx` */}
      <Todos todos={todos} setTodos={setTodos} />
    </main>
  );
}

export default App;
