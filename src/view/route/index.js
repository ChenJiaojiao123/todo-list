
import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Index from '../index/index';
import New from '../new/index';
import Mobx from '../mobx/index';
import './index.css';

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
					<li className="menu">
						<Link to="/mobx">mobx</Link>
					</li>
				</ul>
				<Route path="/" exact component={Index} />
				<Route path="/new" component={New} />
				<Route path="/mobx" component={Mobx} />
			</Router>
		);
	}
}

export default App;
