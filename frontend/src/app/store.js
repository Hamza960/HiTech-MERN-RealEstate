import { configureStore } from '@reduxjs/toolkit';
import { api } from '../lib/api.js';
import uiReducer from '../features/ui/uiSlice.js';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    ui: uiReducer
  },
  middleware: (getDefault) => getDefault().concat(api.middleware)
});

export default store;
