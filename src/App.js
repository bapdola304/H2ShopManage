import React, { Component } from 'react';
import Routes from './routes/Routes';
import { ToastContainer } from 'react-toastify';
import Spinner from './components/Spinner';
import './assets/scss/theme.scss';
import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer autoClose={3000} style={{ fontWeight: 600 }} />
      <Routes></Routes>
      <Spinner />
    </>;
  }
}

export default App;
