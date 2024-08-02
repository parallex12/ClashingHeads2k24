// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../rootReducer';

const store = configureStore({
  reducer: rootReducer,
  // You can add middleware here if needed, for now it's just default
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check if you don't need it
    }),
});

export default store;
