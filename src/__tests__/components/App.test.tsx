import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../../App';

describe('App Routing', () => {
  test('the app renderds', () => {
    render(
      <Router>
        <App />
      </Router>,
    );
  });
});
