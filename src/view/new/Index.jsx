import React from 'react';
import './new.css';

import Section from './Section';
import Footer from './Footer';

export default class New extends React.Component {
	constructor(props) {
		super(props);

		const value = localStorage.getItem('value') || '[]';
		const parseValue = JSON.parse(value);
		//将数组保存在共同的父组件内
		this.state = {
			arr: parseValue,
			filterValue: 'all',
			buttonDisplay: false
		};

		this.addArrItem = this.addArrItem.bind(this);
		this.deleteArrItem = this.deleteArrItem.bind(this);
		this.changeArrItem = this.changeArrItem.bind(this);

		this.changeInputEdit = this.changeInputEdit.bind(this);

		//更新filterValue的值
		this.changeStatus = this.changeStatus.bind(this);

		this.clearFinished = this.clearFinished.bind(this);

		this.updateList = this.updateList.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		if (JSON.stringify(prevState.arr) !== JSON.stringify(this.state.arr)) {
			this.saveToLocalStorage();
		}
	}

	//增加数组元素
	addArrItem(inputValue) {
		const { arr } = this.state;
		const listItem = {
			id: new Date().valueOf(),
			listValue: inputValue,
			status: 'unfinished',
			selected: false,
			unEdit: true
		};
		const backupList = JSON.parse(JSON.stringify(arr));
		backupList.push(listItem);
		//传入第二个参数作为更新完 state 之后的回调，可以获取到更新后的state
		this.setState(
			{
				arr: backupList
			}
			// ,
			// this.saveToLocalStorage
		);
	}

	//删除数组元素
	deleteArrItem(id) {
		const { arr } = this.state;
    const tempList = JSON.parse(JSON.stringify(arr));
    const index = arr.findIndex((item) => item.id === id);

		tempList.splice(index, 1);
		this.setState(
			{
				arr: tempList
			}
			// ,
			// this.saveToLocalStorage
		);
	}

	//改变数组中对象的status属性
	changeArrItem(id) {
		const { arr } = this.state;
		const tempList = JSON.parse(JSON.stringify(arr));
		console.log('id', id);
		//获取数组元素的下标
		const index = tempList.findIndex((item) => item.id === id);
		console.log('index', index);
		if (tempList[index].status === 'unfinished') {
			tempList[index].status = 'finished';
		} else {
			tempList[index].status = 'unfinished';
		}
		this.setState(
			{
				arr: tempList
			}
		);
	}

	//改变input的disable
	changeInputEdit(id) {
    console.log(2);
		const { arr } = this.state;
		const tempList = JSON.parse(JSON.stringify(arr));
		const index = tempList.findIndex((item) => item.id === id);
		const disabled = tempList[index].unEdit;
		tempList[index].unEdit = !disabled;
		this.setState(
			{
				arr: tempList
			}
		);
	}

	//将编辑后的输入框的数据更新到数组
	updateList(id, editValue, edit) {
    console.log(1);
    console.log(id, editValue)
		const { arr } = this.state;
		const tempList = JSON.parse(JSON.stringify(arr));
    const index = tempList.findIndex((item) => item.id === id);
		tempList[index].listValue = editValue;
		tempList[index].unEdit = edit;
    console.log('tempList', tempList);
    
		this.setState({
      arr: tempList
    }, () => {
      console.log(this.state.arr);
    });
	}

	//切换filterValue的值，当切换至已完成状态时显示清除按钮
	changeStatus(status) {
		this.setState({
			filterValue: status,
			buttonDisplay: status === 'finished'
		});
	}

	//删除status==finished的数组元素
	clearFinished() {
		const { arr } = this.state;
		const tempList = JSON.parse(JSON.stringify(arr));
		const newArr = tempList.filter((item) => item.status === 'unfinished');
		this.setState(
			{
				arr: newArr
			}
			// ,
			// this.saveToLocalStorage
		);
	}

	//将文本框输入的内容（数组）保存在localStorage中
	saveToLocalStorage() {
		const key = 'value';
		const { arr } = this.state;
		const stringList = JSON.stringify(arr);

		localStorage.setItem(key, stringList);
		//console.log(localStorage.getItem(key));
	}

	changeList() {
		console.log(this.arr);
	}

	render() {
		const { arr, buttonDisplay, filterValue } = this.state;
		return (
			<div className="container">
				<header className="header">
					<h1 className="header__title">todos</h1>
				</header>
				<Section
					list={arr}
					filterValue={filterValue}
					changeInputEdit={this.changeInputEdit}
					addArrItem={this.addArrItem}
					deleteArrItem={this.deleteArrItem}
					changeArrItem={this.changeArrItem}
					updateList={this.updateList}
				/>
				<Footer
					list={arr}
					filterValue={filterValue}
					buttonDisplay={buttonDisplay}
					changeStatus={this.changeStatus}
					clearFinished={this.clearFinished}
				/>
			</div>
		);
	}
}
