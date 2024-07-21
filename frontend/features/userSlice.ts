// src/features/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

// Define the User interface
interface User {
  id: number;
  name: string;
  email: string;
}

// Define your initial state
interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: []
};

// Create the user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    }
  }
});

// Export the action
export const { setUsers } = userSlice.actions;

// Define and export the selector
export const selectUsers = (state: RootState): User[] => state.user.users;

// Export the reducer
export default userSlice.reducer;
