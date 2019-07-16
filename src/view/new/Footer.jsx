import React from 'react';
import ItemNum from '../../components/ItemNum';
import Status from '../../components/Status'
import ClearCompleted from '../../components/ClearCompleted';

export default class Footer extends React.Component{
  constructor(props) {
		super(props);
		this.state = {
			list: this.props.list,
      buttonDisplay:this.props.buttonDisplay,
      filterValue:this.props.filterValue,
    }
    
    this.changeStatus = this.changeStatus.bind(this);

    this.clearFinished = this.clearFinished.bind(this);
  }
  
  componentDidUpdate(prevProps) {
		if (prevProps.list === this.props.list && prevProps.buttonDisplay === this.props.buttonDisplay && prevProps.filterValue === this.props.filterValue) {
			return null;
    } 
    if(prevProps.list !== this.props.lis){
			this.setState({
        list: this.props.list
      })
    }
    if (prevProps.buttonDisplay !== this.props.buttonDisplay) {
			this.setState({
        buttonDisplay: this.props.buttonDisplay
      })
    }
    if (prevProps.filterValue !== this.props.filterValue) {
			this.setState({
        filterValue: this.props.filterValue
      })
		}
	}

  clearFinished(){
    this.props.clearFinished();
  }

  changeStatus(status){
    this.props.changeStatus(status);
  }

  render(){
    const {list,buttonDisplay,filterValue} =this.state;
    return (
      <footer className="footer">
        <ItemNum list={list} filterValue={filterValue}/>
        <Status changeStatus={this.changeStatus}/>
        <ClearCompleted buttonDisplay={buttonDisplay}  clearFinished={this.clearFinished}/>
      </footer>
    )
  }
}
