import React from 'react';
import { Route } from 'react-router';

import App from './components/app';

import { HomeIndex, HomeMain } from './components/home';
import { BudgetRoute } from './components/budget';
import { BudgetUpdateRoute } from './components/budgetupdate';

import { BudgetRoute2 } from './components/budget2';
import { BudgetUpdateRoute2 } from './components/budgetupdate2';

export default (
    <Route path = "/" component = { App } >
        {[HomeIndex, HomeMain, BudgetRoute, BudgetRoute2, BudgetUpdateRoute, BudgetUpdateRoute2]}
    </Route>
);

