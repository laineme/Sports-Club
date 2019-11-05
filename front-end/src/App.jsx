/**
 * Sports club
 * Marjaana Laine
 *
 */

import React from 'react';
import 'fomantic-ui-css/semantic.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WebFont from 'webfontloader';

import { ThemeProvider } from 'styled-components';
import checkUser from './components/checkUser';
import checkAdmin from './components/checkAdmin';
import Main from './components/Main';
import Home from './components/Home';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';
import * as routes from './constants/routes';

WebFont.load({
  google: {
    families: ['Vollkorn:700', 'Open Sans:300,400,600,800'],
  },
});

const App = function AppContent() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />

        <Router>
          <Switch>
            <Route exact path={routes.ROOT} component={Home} />
            <Route path={routes.LOGIN} component={Main} />
            <Route path={routes.REGISTER} component={Main} />
            <Route path={routes.COURSES} component={checkUser(Main)} />
            <Route path={routes.PROFILE} component={checkUser(Main)} />
            <Route path={routes.MEMBERS} component={checkAdmin(Main)} />
            <Route path={routes.MEMBERSADD} component={checkAdmin(Main)} />
            <Route path={routes.LOGOUT} component={checkUser(Main)} />
          </Switch>
        </Router>
      </>
    </ThemeProvider>
  );
};

export default App;
