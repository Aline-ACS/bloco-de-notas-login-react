import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Routes from './routeWrapper';

import LoginPage from '../pages/login';
import HomePage from '../pages/home';
import Cards from '../pages/card';

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Routes path="/login" component={LoginPage} />
        <Routes path="/" exact isPrivate component={HomePage} />
        <Routes path="/cards" exact isPrivate component={Cards} />
      </Switch>
    </BrowserRouter>
  );
};
