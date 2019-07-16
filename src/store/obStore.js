import { observable, computed, autorun, action } from 'mobx';
import {} from 'mobx-react';

class ObservableTodoStore {
	@observable todos = [];
	@observable pendingRequests = 0;
	@observable test = "hello mobx";

	constructor() {
		autorun(() => console.log(this.report));
	}

	@computed
	get completedTodosCount() {
		return this.todos.filter((todo) => todo.completed === true).length;
	}

	@computed
	get report() {
		if (this.todos.length === 0) return '<none>';
		return `Next todo: "${this.todos[0].task}". ` + `Progress: ${this.completedTodosCount}/${this.todos.length}`;
  }
  
  @action.bound
  setTest(test) {
      this.test = test;
  }

	addTodo(task) {
		this.todos.push({
			task: task,
			completed: false,
			assignee: null
		});
	}
}

const oStore = new ObservableTodoStore();

export default oStore;
