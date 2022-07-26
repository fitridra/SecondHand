import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';

test('renders learn react link', () => {
  render(<React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>);
});
