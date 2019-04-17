import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/app';
import SessionProvider from './components/session-provider';

ReactDOM.render(
  <Router>
    <CssBaseline>
      <SessionProvider>
        <App />
      </SessionProvider>
    </CssBaseline>
  </Router>,
  document.getElementById('root'),
);
