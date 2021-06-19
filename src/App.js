import React from 'react';
import { Counter } from './features/counter/Counter';
import TaskInput from './features/task/TaskInput';
import TaskList from './features/task/TaskList';
import Fetch from './features/fetch/Fetch';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Counter />
        <TaskInput />
        <TaskList />
        <Fetch />
      </header>
    </div>
  );
}

export default App;
