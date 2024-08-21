// userSlice.test.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer, { login, logout } from './userSlice';
import { RootState } from '../store'; // Make sure the path is correct

describe('userSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({ reducer: { user: userReducer } });
  });

  it('should handle login', () => {
    const user = { id: 1, name: 'John Doe' };
    const token = 'test-token';

    store.dispatch(login({ token, user }));

    // Directly typing the state
    const state = store.getState() as RootState;
    expect(state.user.token).toBe(token);
    expect(state.user.user).toEqual(user);
  });

  it('should handle logout', () => {
    store.dispatch(login({ token: 'test-token', user: { id: 1, name: 'John Doe' } }));
    store.dispatch(logout());

    // Directly typing the state
    const state = store.getState() as RootState;
    expect(state.user.token).toBeNull();
    expect(state.user.user).toBeNull();
  });
});
