import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';


import { HomeIndex, HomeMain } from './components/home';
import { BudgetRoute } from './components/budget';
import { BudgetUpdateRoute } from './components/budgetupdate';



export default (
    <Route path = "/" component = { App } >
        {[HomeIndex, HomeMain, BudgetRoute, BudgetUpdateRoute]}
    </Route>
);