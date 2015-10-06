import React from 'react';  
import Router from 'react-router';  
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

import Login from './components/Login.js';
import IssuesView from './components/IssuesView.js';
import IssueView from './components/IssueView.js';
import IssueStore from './IssueStore.js';


let App = React.createClass({  
  getInitialState(){
    return {
      issues: IssueStore.getIssues(),
      loading:true
    }
  },

  componentWillMount() {
    IssueStore.init()
  },

  componentDidMount() {
    IssueStore.addChangeListener(this.updateIssues)
  },

  componentWillUnmount() {
    IssueStore.removeChangeListener(this.updateIssues)
  },

  updateIssues() {
    if (!this.isMounted())
      return

    this.setState({
      issues: IssueStore.getIssues(),
      loading: false
    })
  },


  render() {
    
    return (
      <div class='pageContainer'>
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





