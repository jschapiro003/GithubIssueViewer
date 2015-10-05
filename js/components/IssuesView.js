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
	}
	
}

export default IssuesView;  



/*
 <div class="feed">
        <!--1 Column Feed Item Holder-->


        <div class="feed-item blog">
          <div class="icon-holder">
            <div class="icon"></div>
          </div>
          <div class="text-holder col-3-5">
            <div class="feed-title">Blog Item</div>
            <div class="feed-description">Lorem ipsum dolor nde sunt nobis quia, nam quasi!
            </div>
          </div>
          <!--End of Text Holder-->


          <div class="post-options-holder">
            <div class="tools">
              <i class="fa fa-ellipsis-v" id="postsettings"></i>
            </div>
            <!--End Tools-->
          </div>
          <!--End Post Options Holder -->

        </div>



 */