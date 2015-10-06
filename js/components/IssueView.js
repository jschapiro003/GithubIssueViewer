import React from 'react';
import Router from 'react-router';  
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import IssueStore from '../IssueStore.js';

let IssueView = React.createClass({ 

  render() {
  	//issue number retrieved based on url not on property passed in through Link!
  	let issue = IssueStore.getIssue(this.props.params.number);
    return(
    	<div>
  			<div key={issue.number} style={styles.issue}> 
  				<p style={styles.issue_number}>#{issue.number}</p>
  				<div style={styles.issue_icon_holder}>
  					<div style={styles.issue_icon.style(issue.user.avatar_url)}></div>
  				</div>
  				<div style={styles.issue_content}>
	  				<p style={styles.issue_title}>{issue.title}</p>
	  				<p style={styles.issue_username}>@{issue.user.login}</p>
	  				<p style={styles.issue_summary}>{issue.body}
	  					<Link to={`issues/${issue.number}`} > ...</Link>
	  				</p>
  				</div>
  			</div>

    		<Link to='/issues'> Back </Link>
    	</div>
    );
  }
});

let styles = {
	issue: {
		marginTop:20,
		marginLeft:50,
		marginRight:50,
		background:'white',
	},
	issue_content: {
		marginLeft:10,
		paddingTop:10,
		paddingBottom:30,
	},
	issue_title: {
		fontSize:18,
		fontWeight:'bold',
	},
	issue_icon_holder: {
		width: 55,
  		float: 'left',
  		marginTop: 21,
  		marginBottom: 20,
  		marginRight: 15,
  		marginLeft: 25
	},
	issue_icon: {
		style: function(avatar_url){
			return {
				 width: 55,
				 height: 55,
				 borderRadius: 100,
				 float: 'left',
				 backgroundImage: 'url('+avatar_url+')',
				 backgroundSize:'cover',
				 WebkitBoxShadow: "0 1px 2px rgba(0,0,0,0.3)",
			}
		}
		
	},
	issue_number: {
		float:'right',
		fontSize:14,
		marginRight:10,
		marginTop:5,
	},
	issue_username: {
		fontSize:16,
		marginLeft:40,
	},
	issue_summary: {
		fontSize: 14,
		color:'#A9A9A9'

	},
	issue_labels: {
		float:'right'
	}

	
}

export default IssueView;  