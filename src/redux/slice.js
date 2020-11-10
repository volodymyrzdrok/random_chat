import { createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import defaultContacts from '../db/defaultContacts.json';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: defaultContacts,
  reducers: {
    addNewContact: (state, action) => [action.payload, ...state],
    addNewMessage: (state, action) => [
      action.payload,
      ...state.filter(el => el.id !== action.payload.id),
    ],

    removeContact: (state, action) =>
      (state = state.filter(item => item.id !== action.payload)),
  },
});

const userNameSlice = createSlice({
  name: 'userName',
  initialState: '',
  reducers: {
    setUserName: (state, action) => action.payload,
    resetUserName: (state, action) => (state = ''),
  },
});

export const {
  addNewContact,
  addNewMessage,
  removeContact,
} = contactsSlice.actions;

const userName = userNameSlice.reducer;
const contacts = contactsSlice.reducer;

export default combineReducers({
  contacts,
  userName,
});
