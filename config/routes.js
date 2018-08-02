import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import App from 'App/App';
import DashboardPage from 'Dashboard/DashboardPage';

// layouts
import CenteredBoxPage from 'components/CenteredBoxPage';

const routes = (
  <Route path="/" component={App}>
    <IndexRedirect to="/dashboard" />
    <Route path="dashboard" component={CenteredBoxPage} title="Sign-up Form">
      <IndexRoute component={DashboardPage} />
    </Route>
  </Route>
);

export default routes;
