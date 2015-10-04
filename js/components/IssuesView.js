import React from 'react';
import Router from 'react-router';  
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

let IssuesView = React.createClass({ 

  render() {
    return(
    	<div>
	    	Welcome to Main Issues View
	    	<Link to='/issues/issue/hello'> Enter</Link>
    	</div>
    	);

  }
});

export default IssuesView;  