import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import JobTitle from './component/jobSearch/JobTitle';
import store from './store/store';
import JobListComp from './component/jobList/JobList';

function App() {
  return (
    <Provider store = {store}>
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Switch>
              <Route exact path = "/" component = {JobTitle} />
              <Route path = "/job/:id" component = {JobListComp}/>
            </Switch>
          </BrowserRouter>
        </header>
      </div>
    </Provider>
  );
}

export default App;
