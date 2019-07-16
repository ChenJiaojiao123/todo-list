import React from 'react';
import './itemNum.css';

export default class ItemNum extends React.Component{
  constructor(props) {
		super(props);

		this.state = {
      list:this.props.list,
      filterValue:this.props.filterValue,
    };
  }
    
  componentDidUpdate(prevProps) {
		if (prevProps.list === this.props.list && prevProps.filterValue === this.props.filterValue) {
			return null;
    } 
    if (prevProps.list !== this.props.list){
      this.setState({
        list: this.props.list
      })
    }
    if (prevProps.filterValue !== this.props.filterValue) {
			this.setState({
        filterValue: this.props.filterValue
      })
    }
  }
  
  getItemLeft(){
    const {list,filterValue} = this.state;
    let tempList = [];
		if(filterValue === "unfinished" ){
			 tempList = list.filter((item)=>item.status === "unfinished");
		} else if(filterValue === "finished" ){
			 tempList = list.filter((item)=>item.status === "finished");
		} else {
			 tempList = list;
		}
    return tempList.length;
  }

  render(){
    return (
      <div className="footer-left">
        <strong>{this.getItemLeft()}</strong>
        <span>item left</span>
      </div>
    );
  }

}
