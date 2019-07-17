import React from 'react';
import { observer, inject } from 'mobx-react';
import '../../components/ClearCompleted/clearCompleted.css';

@inject("uiStore", "obStore")
@observer
class NewClearCompleted extends React.Component{

  constructor(props) {
		super(props);
    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick(){
    this.props.obStore.clearFinished();
  }

  render(){
    const {buttonDisplay} = this.props.obStore;
    
    return (
      buttonDisplay ?
       <button
        className="footer-right-show" 
        onClick={this.buttonClick}
        >Clear finished <span></span></button>: <span />
    );
  }
}

export default NewClearCompleted;
