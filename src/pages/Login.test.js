import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import api from '../lib/api';
import { setToken } from '../reducers/api-store';
import store from '../store/store';
import Login from './Login';

test('renders learn react link', () => {
  render(<React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Login api={api} setToken={setToken}/>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>);

const button = screen.getByRole('button', {name: 'Masuk'})
fireEvent.click(button)
  
});
