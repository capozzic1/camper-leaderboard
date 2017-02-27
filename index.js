var React = require('react');
var ReactDOM = require('react-dom');
var url = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';


class Table extends React.Component { 
constructor(props){
	super(props);
	this.state = {campers:[]};
	this.handleClick = this.handleClick.bind(this);
}



handleClick(e){
	e.preventDefault();
	//console.log("testing");
	var camperJSON = this.state.campers;
	var camperArr = [];

	camperArr.push(camperJSON);
	if (e.target.className == "alltime") {
	camperArr[0].sort((a,b) => {
		return b.alltime - a.alltime;
		});
		this.setState({
		campers:camperArr[0]
	});
	} else { 
	camperArr[0].sort((a,b) => {
		return b.recent - a.recent;
		});
		this.setState({
		campers:camperArr[0]
	});
	}
	
	

}

componentDidMount(){
	var _this = this;
	this.serverRequest = 
	axios
	.get(url)
	.then(function(result){
		_this.setState({
			campers:result.data
		});
	})
	
}

componentWillUnmount(){
	this.serverRequest.abort();
}




render(){
	return (
	<div className="innercon">
	<h1>Camper Leaderboard</h1>
	<table className="table">
		
		<tbody>
		<tr>
		<th>#</th>
		<th>Camper Name</th>
		<th><a href = "" className="past30" onClick={this.handleClick}>Points in past 30 days</a></th>
		<th><a href ="" className="alltime" onClick={this.handleClick}>All time points</a></th>
		</tr>
		{this.state.campers.map(function(camper,i){
			return (
			<tr key={i + 1}>
			<td>{i + 1}</td>
			<td>{camper.username}</td>
			<td>{camper.recent}</td>
			<td>{camper.alltime}</td>
			</tr>
			);
		})}
		</tbody>
	</table>
	</div>
	);
}
}




ReactDOM.render(
  <Table />,
  document.getElementById('tablecon')
);
