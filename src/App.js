import React, { Component } from 'react';
import Routes from './routes/Routes';

// Themes

// default
import './assets/scss/theme.scss';
import Spinner from './components/Spinner';

// dark
// import './assets/scss/theme-dark.scss';

// rtl
// import './assets/scss/theme-rtl.scss';


/**
 * Main app component
 */

const isLoading = false

class App extends Component {
  render() {
    return <>
      <Routes></Routes>
      {isLoading && <Spinner />}
    </>;
  }
}

export default App;
