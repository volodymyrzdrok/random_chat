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

const actionSlice = createSlice({
  name: 'action',
  initialState: { filter: '', botType: false },
  reducers: {
    changeFilter: (state, action) => ({ ...state, filter: action.payload }),
    botTypingText: (state, action) => ({ ...state, botType: action.payload }),
  },
});

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    token: '',
    imgUser: null,
    nameUser: '',
  },
  reducers: {
    setAccessToken: (state, action) => ({
      ...state,
      token: action.payload,
    }),
    setImgUser: (state, action) => ({ ...state, imgUser: action.payload }),
    setNameUser: (state, action) => ({ ...state, nameUser: action.payload }),
  },
});

export const {
  addNewContact,
  addNewMessage,
  removeContact,
} = contactsSlice.actions;
export const { changeFilter, botTypingText } = actionSlice.actions;
export const { setAccessToken, setImgUser, setNameUser } = sessionSlice.actions;
const session = sessionSlice.reducer;
const contacts = contactsSlice.reducer;
const action = actionSlice.reducer;

export default combineReducers({
  contacts,
  action,
  session,
});
