import React from 'react';
import Router from 'react-router';  
var $ = require('jquery');
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import IssueStore from '../IssueStore.js';

let apiStart = 0;
let apiEnd = 25;

let IssuesView = React.createClass({ 
  
  getInitialState(){
    return {
      issues: IssueStore.getIssuesRange(apiStart,apiEnd),
      loading:true
    }
  },

  componentWillMount() {
    IssueStore.init()
  },

  componentDidMount() {
  	let self = this;
    IssueStore.addChangeListener(this.updateIssues)
    if ($(window))	{
	    $(window).scroll(function() {
	    	let currentBottom = 0;
	       if($(window).scrollTop() + $(window).height() == $(document).height() && $(window).scrollTop()) {
	           if (IssueStore.getIssues().length > apiEnd){
	           		apiEnd = apiEnd + 25;
	           		self.updateIssues();
	           } 
	           
	       }
	    });
    }
  },

  componentWillRecieveProps(nextProps){
  	console.log('next props: ', nextProps)
  },

  componentWillUnmount() {
    IssueStore.removeChangeListener(this.updateIssues)
  },

  updateIssues() {
    if (!this.isMounted())
      return
  	console.log('close one')
    this.setState({
      issues: IssueStore.getIssuesRange(apiStart,apiEnd),
      loading: false
    })
  },

  summaryBlurb: function(summary){
  	let endpoint = 140;
  	if (summary.length <= endpoint){
  		return summary;
  	}
  	//if character after last character of string not a blank space, keep going
  	
  	while(summary[endpoint+1] && summary[endpoint+1] !== ' ' ){

  		endpoint++;
  	}
  	
  	return summary.substr(0,endpoint+1);
  },

  render() {
  	let self = this;
  	let detailIssueURL = 'issues/';
  	let issues = this.state.issues ? this.state.issues.map(function(issue){
  		console.log('here',issue.labels.length)
  		let issueLabels = issue.labels.map(function(label){
  			console.log('labels!!!!')
  			let labelColor = '#'+label.color;
  			return <p style={{display:"inline",color:labelColor,fontSize:"12.5"}}> {label.name}</p>
  		});
  		return (
  			<div key={issue.number} style={styles.issue}> 
  				<p style={styles.issue_number}>#{issue.number}</p>
  				<div style={styles.issue_icon_holder}>
  					<div style={styles.issue_icon.style(issue.user.avatar_url)}></div>
  				</div>
  				<div style={styles.issue_content}>
	  				<p style={styles.issue_title}>{issue.title}</p>
	  				<p style={styles.issue_username}>@{issue.user.login}</p>
	  				{issueLabels || 'no label'}
	  				<Link to={`issues/${issue.number}`} style={styles.link}>
	  					<p style={styles.issue_summary}>{self.summaryBlurb(issue.body)}</p>
	  				...</Link>
  				</div>
  			</div>
  		)
  	}): <p> There are no issues to display </p> ;

    return(
    	<div>
    	<div style={styles.header}> GithubIssueViewer.js <img src="../../assets/githubicon.png" width="25px" height="25px"> </img> </div>
    	<div id="issuesContainer" style={styles.issues}>
	       
	    		{issues}
    	</div>
    	</div>
    	);

  }
});

//issues styles
let styles = {
	header: {
	  backgroundColor:'white',
	  opacity:".78",
	  top:0,
	  width:'100%',
	  height:'15%',
	  paddingTop:'10',
	  paddingBottom:'10',
	  fontSize:24,
	  fontFamily:'Tahoma', 
	  textAlign:'center',
	  color:'#f2b632',
	  marginBottom:"25",
	},
	link: {
		color:"#A9A9A9",
		textDecoration: "none"
	},

	issue: {
		marginTop:30,
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
		color:'#252839',
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
		color:'#252839',
	},
	issue_username: {
		fontSize:16,
		marginLeft:40,
		fontStyle:'italic',
		color:'#677077',
	},
	issue_summary: {
		fontSize: 14,
		color:'#A9A9A9'

	},



}

export default IssuesView;  



