import React, { Component } from 'react';
import Routes from './routes/Routes';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Spinner from './components/Spinner';
import './assets/scss/theme.scss';
import 'react-toastify/dist/ReactToastify.css';
import { history } from './helpers/navigation';

// dark
// import './assets/scss/theme-dark.scss';

// rtl
// import './assets/scss/theme-rtl.scss';


/**
 * Main app component
 */

class App extends Component {
  render() {
    return <>
      <Router history={history}>
        <ToastContainer autoClose={3000} style={{ fontWeight: 600 }} />
        <Routes history={history}></Routes>
        <Spinner />
      </Router>
    </>;
  }
}

export default App;
