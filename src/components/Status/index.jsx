import React from 'react';
import './status.css';

export default class Status extends React.Component{
  constructor(props) {
		super(props);

		this.state = {
      status: "all"
    };

    //this.clickATarget = this.clickATarget.bind(this);
  }
    
  clickATarget(status){
    this.setState({
      status
    });

    this.props.changeStatus(status);
  }
  
  render(){
    const activeClass = this.state.status;

    return (
      <ul className="footer-middle">
        <li>
          <span className={activeClass === "all" ? "active": ""} onClick={this.clickATarget.bind(this,"all")}>All</span>
         </li>
        <li>
        <span className={activeClass === "unfinished" ? "active": ""} onClick={this.clickATarget.bind(this,"unfinished")} >Unfinished</span>
        </li>
         <li>
         <span className={activeClass === "finished" ? "active": ""} onClick={this.clickATarget.bind(this,"finished")}>Finished</span>
       </li>
      </ul>
    );
  }
}