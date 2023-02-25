import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// Context state
import UserState from './Context/User/UserState';
import TaskState from './Context/Tasks/TaskState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <UserState>
      <TaskState>
        <App />
      </TaskState>
    </UserState>
  </BrowserRouter>
  // </React.StrictMode>
);
