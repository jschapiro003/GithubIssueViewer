import React from 'react';
import Router from 'react-router';  
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';	
var DriveIn = require('react-drive-in');

let Login = React.createClass({ 

  render() {
    return(
    	<div>
    	<DriveIn mute={false}
    		  loop = {false}
    	      show="../../assets/introMovie.mp4"
    	      poster="../../assets/githubicon.png"
    	    />,
    	    $mountNode
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
		marginTop:"40%",
		marginLeft: "auto",
		marginRight: "auto",
		width: "15em",
		textAlign:"center",
		color:"#A9A9A9",
		opacity:".8",
		backgroundColor:'white',
		
	},
	enter: {
		fontSize:"24",
		fontWeight:"bold",
		color:'#f2b632',
		textDecoration: "none",
		
		   zIndex: "3", 


	}, 
	vid: {
		 position: "relative",
		 top: 0, 
		 left: 0, 
		  width: "100%",
		  height: "100%"
	}

}

export default Login;  