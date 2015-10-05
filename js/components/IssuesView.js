import React from 'react';
import Router from 'react-router';  
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

const ISSUES_URL = 'https://api.github.com/repos/npm/npm/issues';

let IssuesView = React.createClass({ 
  
  getInitialState: function() {
     return {
       issuesList: [],
     };
   },
  
  componentDidMount: function() {
    $.get(ISSUES_URL, function(results) {
      if (this.isMounted()) {
        this.setState({
          issuesList:results,
        });
      }
    }.bind(this));
  },

  render() {

  	var issues = this.state.issuesList.map(function(issue){
  		return (
  			<div class="issue"> 
  				<p>Title: {issue.title}</p>
  				<p>num: {issue.number}</p>
  				<p>labels: {issue.labels}</p>
  				<p>username: {issue.user.login}</p>
  				<p>gravatar: {issue.user.avatar_url}</p>
  				<p>body: {issue.body}</p>
  			</div>
  		)
  	});

    return(
    	<div>
	    	Welcome to Main Issues View
	    		{issues}
	    	<Link to='/issues/issue/hello'> Enter</Link>
    	</div>
    	);

  }
});

export default IssuesView;  