import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  idCount: 3,
  tasks: [
    { id: 3, title: 'TASK C', completed: false },
    { id: 2, title: 'TASK B', completed: true },
    { id: 1, title: 'TASK A', completed: false },
  ],
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    newTask: (state, action) => {
      state.idCount ++;
      const newItem = {
        id: state.idCount,
        title: action.payload,
        completed: false,
      };
      state.tasks = [newItem, ...state.tasks]
    },
    completeTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.completed = !task.completed;
      }
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
    },
  },
});

export const { newTask, completeTask, deleteTask } = taskSlice.actions;

export const selectTasks = (state) => state.task.tasks;

export default taskSlice.reducer;
