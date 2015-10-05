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
  			<div style={styles.issue}> 
  				<div style={styles.issue_icon_holder}>
  					<div style={styles.issue_icon.style(issue.user.avatar_url)}></div>
  				</div>
  				<div style={styles.issue_content}>
	  				<p style={styles.issue_title}>{issue.title}</p>
	  				<p>num: {issue.number}</p>
	  				<p>labels: {issue.labels}</p>
	  				<p>username: {issue.user.login}</p>
	  				<p>body: {issue.body}</p>
  				</div>
  			</div>
  		)
  	});

    return(
    	<div style={styles.issues}>
	    	Welcome to Main Issues View
	    		{issues}
	    	<Link to='/issues/issue/hello'> Enter</Link>
    	</div>
    	);

  }
});

//issues styles
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
		paddingBottom:10,
	},
	issue_title: {
		fontSize:24,
	},
	issue_icon_holder: {
		width: 55,
  		float: 'left',
  		marginTop: 21,
  		marginBottom: 20,
  		marginRight: 0,
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
		
	}

	
}

export default IssuesView;  



