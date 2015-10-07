import React from 'react';
import Router from 'react-router';  
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import IssueStore from '../IssueStore.js';

let IssueView = React.createClass({ 
  getInitialState(){
  	return {
  		comments: [],
  		loading:true
  	}
  },
  componentDidMount() {
  	let self = this;
  	if (this.props.params){
	    this.getIssueComments(this.props.params.number,function(err,res){
	    	let comments = [];
	    	if (err){
	    		console.log(err)
	    	}
	    	if (res){
	    		console.log('comments',res)
		    	res.forEach(function (comment) { 
		    		console.log('comment',comment)
			      comments.push(comment); 
			      self.setState({comments:comments});
		      })
	    	}
	    })
  	} else {
  		self.setState({comments:[]});
  	}
  },
  componentWillReceiveProps(nextProps){
  	console.log('next props for issue: ', nextProps)
  },

  getIssueComments(issueNumber,cb){
  	let req = new XMLHttpRequest();
  	let url = 'https://api.github.com/repos/npm/npm/issues/' + issueNumber + '/comments'
  	req.onload = function () {
  	  if (req.status === 404) {
  	    cb(new Error('not found'))
  	  } else {
  	    cb(null, JSON.parse(req.response))
  	  }
  	}
  	req.open('GET', url)
  	req.send()
  },
  
  getIssueState(state){
  	if (state==='open'){
  		return <span style={styles.openIssue}> OPEN </span>
  	} else {
  		return <span style={styles.closedIssue}> CLOSED </span>
  	}
  },

  render() {
  	let self = this;
  	let issue;
  	//issue number retrieved based on url not on property passed in through Link!
  	if (this.props.params){
	  	issue =  IssueStore.getIssue(this.props.params.number);		
  	}
  	if (!issue){
  		console.log('here help')
  		return <div>This issue could not be found</div>;
  	}
  	
  	let issueLabels = issue && issue.labels  ? issue.labels.map(function(label){
  		let labelColor = '#'+label.color;
  		return <p style={{display:"inline",color:labelColor,fontSize:"12.5"}}> {label.name}</p>
  	}): <p> </p>;
  	
  	let comments = this.state.comments? this.state.comments.map(function(comment){

  		return (
  				<div>
  					<div style={styles.comment_holder}>
  						<div style={styles.comment_icon_holder.style(comment.user.avatar_url)}></div>
  					</div>
	  				<p style={styles.comment_user}> <a href={comment.user.html_url} target="_blank"> @{comment.user.login} </a></p>
	  				<p style={styles.comment_summary}> {comment.body} </p>

  				</div>
  			);
  	}): <p> No comments </p>;
    return(

    	<div>
    		{console.log('not here')}
    		<div style={styles.header}> GithubIssueViewer.js <img src="../../assets/githubicon.png" width="25px" height="25px"> </img> </div>
  			<div key={issue.number} style={styles.issue}> 
  				<p style={styles.issue_number}>#{issue.number || ''}</p>
  				<div style={styles.issue_icon_holder}>
  					<div style={styles.issue_icon.style(issue.user.avatar_url)}></div>
  				</div>
  				<div style={styles.issue_content}>
	  				<p style={styles.issue_title}>{issue.title}</p>
	  				<p style={styles.issue_username}>@{issue.user.login}</p>
	  				<p style={styles.state}> {self.getIssueState(issue.state)} </p>
	  				{issueLabels}
	  				<p style={styles.issue_summary}>{issue.body}</p>
  				</div>
  				<div style={styles.comments_section}>
  					<div>
  						<p style={{fontWeight:'bold'}}> Comments </p>
  						{comments}
  					</div>

  				</div>
  				<Link to='/issues' style={styles.backbutton}> Back </Link>
  			</div>

    		
    	</div>
    );
  }
});

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
	backbutton:{
		marginLeft:10,
		color:"#A9A9A9",
	},
	issue: {
		marginTop:60,
		marginLeft:50,
		marginRight:50,
		marginBottom:10,
		background:'white',
	},
	issue_content: {
		marginLeft:10,
		paddingTop:10,
		paddingBottom:30,
		paddingRight:10,
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
		color:'#A9A9A9',
		marginLeft:"85",
		marginRight:"85",

	},
	issue_labels: {
		float:'right'
	},
	openIssue: {
		backgroundColor:'green',
		color:'white',
		float:"left",
		marginRight:"10",
	},
	closedIssue: {
		backgroundColor:'red',
		color:'white',
		float:"left",
		marginRight:"10",
	},
	comments_section: {
		
		
    	backgroundColor:"white",
    	marginTop:10,
    	marginLeft:"12%",
    	marginRight:"20%",
    	marginBottom:30,
    	paddingTop:20,
    	paddingBottom:20,
    	paddingLeft:20,
    	

	},
	comment_user: {
		fontSize:15,
		marginLeft:'5%',
	},
	comment_summary: {
		fontSize:12,
		color:"#A9A9A9",
		marginLeft:'5%',
	},
	comment_icon: {
		width: 35,
  		float: 'left',
  		marginTop: 21,
  		marginBottom: 20,
  		marginRight: 25,
  		
  		paddingRight:20,
	},
	comment_icon_holder: {
		style: function(avatar_url){
			return {
				 width: 35,
				 height: 35,
				 borderRadius: 100,
				 float: 'left',
				 backgroundImage: 'url('+avatar_url+')',
				 backgroundSize:'cover',
				 WebkitBoxShadow: "0 1px 2px rgba(0,0,0,0.3)",
			}
		}
	}

	
}

export default IssueView;  