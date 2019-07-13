import React from './node_modules/react';

export default class Section extends React.Component{
  constructor(props) {
		super(props);
		const value = localStorage.getItem('value') || '[]';
		const parseValue = JSON.parse(value);

		this.state = {
			list: parseValue,
			inputValue: '',
			filterValue: 'unfinished',
			checkboxDisplay: 'none',
			tickColor:"black"
		};

		this.inputPress = this.inputPress.bind(this);
		this.getInputValue = this.getInputValue.bind(this);
		//this.isChecked = this.isChecked.bind(this);
		//this.onChangeCheckbox = this.onChangeCheckbox.bind(this);

		//this.cancle = this.cancle.bind(this);
		//this.sure = this.sure.bind(this);

		this.changeTick = this.changeTick.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
	}
	
	// 点击enter后更新数组
	inputPress(e) {
		if (e.which === 13) {
			const { inputValue, list } = this.state;
			const listItem = {
				listValue: inputValue,
				status: 'unfinished',
				selected: false,
			};
			const backupList = JSON.parse(JSON.stringify(list));
			backupList.push(listItem);
			//更新数组
			//传入第二个参数作为更新完 state 之后的回调，可以获取到更新后的state
			this.setState(
				{
					list: backupList,
					inputValue: ''
				},
				this.saveToLocalStorage
			);
		}
	}

	//将文本框输入的内容（数组）保存在localStorage中
	saveToLocalStorage() {
		const key = 'value';
		const { list } = this.state;
		const stringList = JSON.stringify(list);

		localStorage.setItem(key, stringList);
		console.log(localStorage.getItem(key));
	}

	//获取输入框的值
	getInputValue(e) {
		this.setState({
			inputValue: e.target.value
		});
	}


	//改变对勾
	changeTick(itemIndex){
		console.log("hello");

		// const { list ,filterValue} = this.state;
		// const tempList = JSON.parse(JSON.stringify(list));

		// if(tempList.selected){
			//更新tickColr
		// }
		// console.log(itemIndex);
		// console.log(this);
		// console.log(this.state.list);

		//tempList[itemIndex].status = filterValue === 'finished' ? 'unfinished' : 'finished';
		// this.setState(
		// 	{
		// 		list: tempList
		// 	},
		// 	this.saveToLocalStorage
		// );
	}


	//删除某一项
	deleteItem(itemIndex){
		//console.log(itemIndex);

		const { list } = this.state;
		const tempList = JSON.parse(JSON.stringify(list));
		tempList.splice(itemIndex,1);
		//console.log(tempList);
		
		// this.setState(
		// 	{
		// 		list: tempList
		// 	},
		// 	this.saveToLocalStorage
		// );
		// console.log(this.state.list);

	}
	
  render() {
		const {  list, inputValue } = this.state;
    return (
      <section className="content">
        <div className="content__start-gl"></div>
        <div className="content__form-line">
          <div className="form-checkbox">
            <span>♚</span>
          </div>
          <div className="form-input">
            <input type="text" placeholder="What needs to be done?" value={inputValue} onKeyPress={this.inputPress}	onChange={this.getInputValue}/>
          </div>
        </div>
        <div className="todos">
					<ul>
						{list.map((item, index) => {
								return (
									//数组或迭代器内每个子元素都必须有 prop 属性："key"。
									<li className="todos__li" key={index}>
										<div className="form__item">
											<span className="form__item-cb">✔</span>
										</div>
										<div className="showList">
											<input type="text" value={item.listValue} />
											<button className="btn" onClick={this.deleteItem(index)}>✖</button>
										</div>
									</li>
								);
						})
					}
					</ul>
        </div>
      </section>
    );
  }
}