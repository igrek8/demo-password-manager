import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/app';

ReactDOM.render(
  <Router>
    <CssBaseline>
      <App />
    </CssBaseline>
  </Router>,
  document.getElementById('root'),
);
