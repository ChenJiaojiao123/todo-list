import { observable, computed, autorun, action, reaction } from 'mobx';
import {} from 'mobx-react';
import { toJS } from 'mobx';

class ObservableTodoStore {
	// @observable todos = [];
	// @observable pendingRequests = 0;
	// @observable test = "hello mobx";

	// constructor() {
	// 	autorun(() => console.log(this.report));
	// }

	// @computed
	// get completedTodosCount() {
	// 	return this.todos.filter((todo) => todo.completed === true).length;
	// }

	// @computed
	// get report() {
	// 	if (this.todos.length === 0) return '<none>';
	// 	return `Next todo: "${this.todos[0].task}". ` + `Progress: ${this.completedTodosCount}/${this.todos.length}`;
	// }

	// @action.bound
	// setTest(test) {
	//     this.test = test;
	// }

	// addTodo(task) {
	// 	this.todos.push({
	// 		task: task,
	// 		completed: false,
	// 		assignee: null
	// 	});
	// }

	constructor() {
		// autorun(() => console.log('autorun 1:', this.list));
		// autorun(() => console.log('autorun 3:', this.test));
		// autorun(() => console.log('autorun 4:', this.test , this.list));
		// reaction(() => this.list.map((item) => item), (list) => console.log('reaction 2:', list));
		// reaction(() => this.test, (test) => console.log('reaction 5:', test));
		// autorun(() => console.log('autorun 6:', this.obj));
		// this.autorun = autorun(() => console.log('autorun 7:', this.obj.a));

		reaction(() => this.list.map((item) => item), (list) =>this.saveToLocalStorage(list));
		reaction(() => ({
			filterValue: this.filterValue,
			list: this.finishedList
		}), ({ filterValue, list }) => {
			this.buttonDisplay = (filterValue === "finished" && list.length);
		});
	}

	@observable value = localStorage.getItem('value') || '[]';
	@observable parseValue = JSON.parse(this.value);

	@observable list = this.parseValue;
	@observable obj = {};
	@observable filterValue = 'all';
	@observable buttonDisplay = false;
	@observable test = 'hello world';

	@action.bound
	setTest() {
		this.test = Math.random()*1000;
	}

	@action.bound
	setObj() {
		// this.obj["a"] = 1;
		this.obj.a = 129;
		this.obj = {};
	}

	@action.bound
	setList() {
		this.list = [{
			status: "unfinished",
			listValue: "123"
		}]
		// this.list.push({
		// 	stattus: "unfinished",
		// 	listValue: "123213"
		// });
	}

	@computed get finishedList() {
		return this.list.filter((item)=>item.status === "finished");
	}

	@computed get unfinishedList() {
		return this.list.filter((item)=>item.status === "unfinished");
	}

	@computed get showList() {
		const {filterValue,list,unfinishedList,finishedList} = this;
		let tempList = [];

		if(filterValue === "unfinished" ){
			 tempList = unfinishedList;
			 console.log(tempList);
		} else if(filterValue === "finished" ){
			 tempList = finishedList;
		} else {
			 tempList = list;
		}
		return tempList;
	}

	//插入一条数组元素
	@action.bound
	addListItem(inputValue) {
		const listItem = {
			id: new Date().valueOf(),
			listValue: inputValue,
			status: 'unfinished',
			selected: false,
			unEdit: true
		};
		this.list.push(listItem);
	}

	//删除一条数组元素
	@action.bound
	deleteListItem(id) {
		const tempList = JSON.parse(JSON.stringify(toJS(this.list)));
		const index = tempList.findIndex((item) => item.id === id);
		tempList.splice(index, 1);
		this.list = tempList;
	}

	//修改数组的对象的unEdit属性
	@action.bound
	changeListUnedit(id) {
		const tempList = JSON.parse(JSON.stringify(toJS(this.list)));
		const index = tempList.findIndex((item) => item.id === id);
		const disabled = tempList[index].unEdit;
		tempList[index].unEdit = !disabled;
		this.list = tempList;

		// console.log(this.list[index].unEdit);
	}

	//修改数组的对象的status属性和selected属性
	@action.bound
	changeListStatus(id){
		const tempList = JSON.parse(JSON.stringify(toJS(this.list)));
		const index = tempList.findIndex((item) => item.id === id);
		if (tempList[index].status === 'unfinished') {
			tempList[index].status = 'finished';
		} else {
			tempList[index].status = 'unfinished';
		}
		const select = tempList[index].selected;
		tempList[index].selected = !select;
		this.list = tempList;

		console.log("selected",this.list[index].selected);
		console.log("status",this.list[index].status);
	}

	//将编辑后的输入框的数据更新到数组
	updateList(id, editValue, edit) {
		const tempList = JSON.parse(JSON.stringify(toJS(this.list)));
    const index = tempList.findIndex((item) => item.id === id);
		tempList[index].listValue = editValue;
		tempList[index].unEdit = edit;

		this.list = tempList;
	}


	//更新filterValue的值，当filterValue等于finished时，显示清除按钮
	@action.bound
	changeStatus(status) {
		this.filterValue = status;
		// if (status === 'finished') {
		// 	this.buttonDisplay = true;
		// }else{
		// 	this.buttonDisplay = false;
		// }
		console.log('filterValue', this.filterValue);
	}

	//删除status==finished的数组元素
	@action.bound
	clearFinished() {
		//console.log("clearFinished");
		const tempList = JSON.parse(JSON.stringify(toJS(this.list)));
		const newArr = tempList.filter((item) => item.status === 'unfinished');
		this.list = newArr;
	}

	//将list保存在localStorage中
	saveToLocalStorage(list) {
		const key = 'value';
		const stringList = JSON.stringify(list);
		localStorage.setItem(key, stringList);
	}
}

const oStore = new ObservableTodoStore();

export default oStore;
