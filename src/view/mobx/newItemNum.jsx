import React from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';

import '../../components/ItemNum/itemNum.css';

@inject("uiStore", "obStore")
@observer
class NewItemNum extends React.Component{
    
  // getItemLeft(){
  //   const {filterValue} = this.props.obStore;
  //   const list = toJS(this.props.obStore.list);
  //   let tempList = [];
	// 	if(filterValue === "unfinished" ){
	// 		 tempList = list.filter((item)=>item.status === "unfinished");
	// 	} else if(filterValue === "finished" ){
	// 		 tempList = list.filter((item)=>item.status === "finished");
	// 	} else {
	// 		 tempList = list;
	// 	}
  //   return tempList.length;
  // }

  
 
  render(){
  
    return (
      <div className="footer-left">
        <strong>
       { this.props.obStore.showList.length}
        </strong>
        <span>item left</span>
      </div>
    );
  }
}

export default NewItemNum;
