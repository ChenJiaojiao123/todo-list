import React from 'react';
import { observer, inject } from 'mobx-react';

import '../../components/Status/status.css';

@inject("uiStore", "obStore")
@observer
class NewStatus extends React.Component{

  //点击a标签切换filterValue的值
  clickATarget(status){
    this.props.obStore.changeStatus(status);
  }
 
  render(){
    const activeClass = this.props.obStore.filterValue;
    return (
      <ul className="footer-middle">
        <li>
          <span 
          className={activeClass === "all" ? "active": ""}
           onClick={this.clickATarget.bind(this,"all")}
          >All</span>
         </li>
        <li>
        <span 
        className={activeClass === "unfinished" ? "active": ""}
         onClick={this.clickATarget.bind(this,"unfinished")} 
        >Unfinished</span>
        </li>
         <li>
         <span 
         className={activeClass === "finished" ? "active": ""} 
         onClick={this.clickATarget.bind(this,"finished")}
         >Finished</span>
       </li>
      </ul>
    );
  }
}

export default NewStatus;
