import { observable, action } from 'mobx';
import {} from 'mobx-react';

class UIStore {
  @observable loading = true;
  
  @action.bound
  setLoading(status) {
      this.loading = status;
  }
}

const uiStore = new UIStore();

export default uiStore;
