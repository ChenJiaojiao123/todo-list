import React from 'react';
import './clearCompleted.css'

export default class ClearCompleted extends React.Component{
  constructor(props) {
		super(props);

		this.state = {
      buttonDisplay:this.props.buttonDisplay
    };
    this.buttonClick = this.buttonClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.buttonDisplay === this.props.buttonDisplay) {
			return null;
		} else {
			this.setState({
        buttonDisplay: this.props.buttonDisplay
      })
		}
  }
  
  buttonClick(){
    this.props.clearFinished();
  }

    
  render(){
    const {buttonDisplay} = this.state;

    return (
      buttonDisplay ? <button className="footer-right-show" onClick={this.buttonClick}>Clear finished <span></span></button>: <span />
    );
  }
}
   