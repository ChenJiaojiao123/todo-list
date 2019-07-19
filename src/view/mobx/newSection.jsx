import React from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';

import NewRadio from './newRadio';

@inject("uiStore", "obStore")
@observer
 class NewSection extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			inputValue: '',
			editValue: ''
		};

		this.inputPress = this.inputPress.bind(this);
		this.getInputValue = this.getInputValue.bind(this);

		this.editInput = this.editInput.bind(this);
	}

	//获取输入框的值
	getInputValue(e) {
		this.setState({
			inputValue: e.target.value
		});
	}

	// 点击enter后给数组添加元素
	inputPress(e) {
		const { inputValue } = this.state;
		if (e.which === 13 && inputValue) {
			this.props.obStore.addListItem(inputValue);
			this.setState({
				inputValue: ''
			});
		}
	}

	//点击叉号删除一条数组元素
	deleteItem(id){
		this.props.obStore.deleteListItem(id);
	}

	//点击对号
	onChangeCheckbox(id){
		this.props.obStore.changeListStatus(id);
	}

	//双击使输入框可编辑(修改数组的对象的unEdit属性)
	doubleClick(id){
		this.props.obStore.changeListUnedit(id);
	}

	//获取编辑的内容
	editInput(e){
		this.setState({
			editValue:e.target.value
		});
	}

	//按enter保存编辑的数据
	saveEditInput(id,e){
		//console.log(e.target.value);
		if(e.which ===13){
			this.onSaveEdit(id);
		}
	}

	onSaveEdit(id) {
		const {editValue} = this.state;
		this.props.obStore.updateList(id,editValue, true);
		this.ref.blur();
	}


	onHandld() {
		const { setList } = this.props.obStore;
		
		setList();
	}

	renderList() {
		
		// const {filterValue,list,unfinishedList,finishedList} = this.props.obStore;
		// let tempList = [];
		// if(filterValue === "unfinished" ){
		// 	 tempList = unfinishedList;
		// 	 console.log(tempList);
		// } else if(filterValue === "finished" ){
		// 	 tempList = finishedList;
		// } else {
		// 	 tempList = list;
		// }

		//const tempList = JSON.parse(JSON.stringify(toJS(this.props.obStore.list)));

		const {showList} = this.props.obStore;

		return showList.map((item,index) => {
			const lineThrough = item.status === 'finished' ? 'lineThrough' : '';
				return (
					//数组或迭代器内每个子元素都必须有 prop 属性："key"。
					<li className="todos__li" key={index}>
						<NewRadio
							 id={item.id}
							 name={item.listValue}
							 checked={item.selected}
							 onChange={this.onChangeCheckbox.bind(this, item.id)}
						/>
						<div
							className="todos__li-content f1"
							onDoubleClick={this.doubleClick.bind(this, item.id)}
						>
							<input ref={(ref) => this.ref = ref } type="text" 
							 className={lineThrough} 
							 disabled={item.unEdit} 
							 onKeyPress={this.saveEditInput.bind(this,item.id)}
							 onChange={this.editInput}  
							 onBlur={this.onSaveEdit.bind(this,item.id)} 
							 value={item.listValue}
							 />
						</div>
						<div className="todos__li-operate" 
						 onClick={this.deleteItem.bind(this, item.id)}>
							<button className="delete">✖</button>
						</div>
					</li>
				);
		})
	}

	render() {
		const {inputValue} = this.state;
		return (
			<section className="content">
				<div className="content__start-gl" />
				<div className="content__form-line">
					<div className="form-checkbox" onClick={this.onHandld.bind(this)}>
						<span>♚</span>
					</div>
					<div className="form-input f1">
						<input
							type="text"
							placeholder="What needs to be done?"
							value={inputValue}
							onKeyPress={this.inputPress}
							onChange={this.getInputValue}
						/>
					</div>
				</div>
				<div className="todos">
          <ul>
          {this.renderList()}
          </ul>
				</div>
			</section>
		);
	}
}

export default NewSection;
