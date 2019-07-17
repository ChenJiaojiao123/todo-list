import React from 'react';
import Radio from '../../components/Radio/index';

export default class Section extends React.Component {
	constructor(props) {
		super(props);
		// const value = localStorage.getItem('value') || '[]';
		// const parseValue = JSON.parse(value);
		this.state = {
			list: this.props.list,
			inputValue: '',
			filterValue: this.props.filterValue,
			checkboxDisplay: 'none',
			editValue: ""
		};

		this.inputPress = this.inputPress.bind(this);
		this.getInputValue = this.getInputValue.bind(this);

		this.editInput = this.editInput.bind(this);

		//this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
	}

	static getDerivedStateFromProps(props, state) {
		// console.log("props; ", props.list);
		// console.log("state; ", state.list);
		if (JSON.stringify(props.list) !== JSON.stringify(state.lis)) {
			return ({
				list: props.list
			})
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.filterValue !== this.props.filterValue) {
			console.log("123", prevProps);
			this.setState({
				filterValue: this.props.filterValue
			});
		}
	}

	// 点击enter后给数组添加元素
	inputPress(e) {
		const { inputValue } = this.state;

		if (e.which === 13 && inputValue) {
			this.props.addArrItem(inputValue);

			this.setState({
				inputValue: ''
			});
		}
	}

	//删除某一项
	deleteItem(index) {
		this.props.deleteArrItem(index);
	}

	//获取输入框的值
	getInputValue(e) {
		this.setState({
			inputValue: e.target.value
		});
	}

	//使输入框可编辑
	doubleClick(id) {
		this.props.changeInputEdit(id);
	}

	//编辑输入框，更新editValue
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
		console.log(editValue);
		//更新数组
		this.props.updateList(id,editValue, true);
		this.ref.blur();
	}

	onChangeCheckbox(id) {
		this.props.changeArrItem(id);
	}

	renderList() {
		const { list, filterValue } = this.state;
		let tempList = [];
		if(filterValue === "unfinished" ){
			 tempList = list.filter((item)=>item.status === "unfinished");
			 console.log(tempList);
		} else if(filterValue === "finished" ){
			 tempList = list.filter((item)=>item.status === "finished");
		} else {
			 tempList = list;
		}

		return tempList.map((item) => {
			const lineThrough = item.status === 'finished' ? 'lineThrough' : '';
				return (
					//数组或迭代器内每个子元素都必须有 prop 属性："key"。
					<li className="todos__li" key={item.id}>
						<Radio
							value={item.id}
							name={item.listValue}
							checked={item.selected}
							onChange={this.onChangeCheckbox.bind(this, item.id)}
						/>
						<div
							className="todos__li-content f1"
							onDoubleClick={this.doubleClick.bind(this, item.id)}
						>
							<input ref={(ref) => this.ref = ref } type="text" className={lineThrough} disabled={item.unEdit} 
							onKeyPress={this.saveEditInput.bind(this,item.id)}
							onChange={this.editInput}  
							onBlur={this.onSaveEdit.bind(this,item.id)}  defaultValue={item.listValue} />
						</div>
						<div className="todos__li-operate" onClick={this.deleteItem.bind(this, item.id)}>
							<button className="delete">✖</button>
						</div>
					</li>
				);
		})
	}

	render() {
		const { inputValue } = this.state;
		return (
			<section className="content">
				<div className="content__start-gl" />
				<div className="content__form-line">
					<div className="form-checkbox">
						<span>♚</span>
					</div>
					<div className="form-input f1">
						<input type="text" placeholder="What needs to be done?" value={inputValue} onKeyPress={this.inputPress}	onChange={this.getInputValue}/>
					</div>
				</div>
				<div className="todos">
					<ul>
						{
							this.renderList()
						}
					</ul>
				</div>
			</section>
		);
	}
}

//onClick={(e) => {this.deleteItem(index, e)}
