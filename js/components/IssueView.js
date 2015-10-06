import React from 'react';
import Router from 'react-router';  
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

let IssueView = React.createClass({ 

  render() {
  	console.log(this.props.issue)
    return(
    	<div>
    		Welcome to Issues Detail View
    		<Link to='/issues'> Back </Link>
    	</div>
    );
  }
});

export default IssueView;  