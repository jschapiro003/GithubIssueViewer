import React from 'react';
import Router from 'react-router';  
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';	

let Login = React.createClass({ 

  render() {
    return(
    	<div>
    		<Link to='/issues'> Login </Link>
    	</div>
    	);
  }
});

export default Login;  