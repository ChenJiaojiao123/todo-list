import React from "react";
import '../Buttons.css';

export default class Buttons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
       buttonDisplay:this.props.defaultDisplay,
    };

    this.onSure = this.onSure.bind(this);
    this.onCancle = this.onCancle.bind(this);
  }

  static getDerivedStateFromProps(props, state){
    return {
       buttonDisplay:props.defaultDisplay
    }
  }

  onSure() {
    console.log("11");
         this.props.changeToUnfinished();
  }

  onCancle() {
    this.props.cancleSelect();
  }


  render() {
    const { buttonDisplay } =this.state;
    //console.log(buttonDisplay);
    return(
      <div className="buttonStyle" style={{ display: buttonDisplay}} >
        <button onClick={this.onSure} >确定</button><br/><br/>
        <button onClick={this.onCancle} >取消</button>
      </div>
    );
  }
}