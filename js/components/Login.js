import React from 'react';
import Router from 'react-router';  
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';	

let Login = React.createClass({ 

  render() {
    return(
    	<div>
	    	<div style={styles.enter_container}>
	    		<Link to='/issues' style={styles.enter}>
	    			Enter
	    		</Link>
	    	</div>
    	</div>
    	);
  }
});

let styles = {
	headline: {
		marginTop:"20%",
		marginLeft: "auto",
		marginRight: "auto",
	},
	enter_container: {
		marginTop:"20%",
		marginLeft: "auto",
		marginRight: "auto",
		width: "8em",
		textAlign:"center",
		color:"#A9A9A9",
		opacity:".6",
		backgroundColor:'white',
		
	},
	enter: {
		fontSize:"24",
		fontWeight:"bold",
		color:'#f2b632',
		textDecoration: "none",

	}

}

export default Login;  