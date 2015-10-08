import React from 'react';  
import Router from 'react-router';  
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

import Login from './components/Login.js';
import IssuesView from './components/IssuesView.js';
import IssueView from './components/IssueView.js';
import IssueStore from './IssueStore.js';


let App = React.createClass({  
  
  playVideo: {

  },

  render() {

    return (
      <div>
          <Login/>
      </div>

    );
  }

 

});

React.render((
  <Router>
    <Route path="/" component={App}/>
    <Route path="issues" component={IssuesView}/>
    <Route path="issues/:number" component={IssueView}/>
  </Router>
), document.body)






