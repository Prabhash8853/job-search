import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import JobTitle from './component/jobSearch/JobTitle';
import store from './store/store';
import JobListComp from './component/jobList/JobList';
import JobDetails from "./component/jobDetails/JobDetails";

function App() {
  return (
    <Provider store = {store}>
          <BrowserRouter>
            <Switch>
              <Route exact path = "/" component = {JobTitle} />
              <Route exact path = "/job/:id" component = {JobListComp}/>
              <Route exact path = "/job/:id/details" component = {JobDetails} />
            </Switch>
          </BrowserRouter>
    </Provider>
  );
}

export default App;
