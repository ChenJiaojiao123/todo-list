
import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './index.css';
import Index from '../index';
import New from '../new';

class App extends React.Component{
	render(){
		return (
			<Router>
				<ul className="menu-box">
					<li className="menu">
						<Link to="/">Index</Link>
					</li>
					<li className="menu">
						<Link to="/new">New Todo</Link>
					</li>
				</ul>
				<Route path="/" exact component={Index} />
				<Route path="/new" component={New} />
			</Router>
		);
	}
}

export default App;
