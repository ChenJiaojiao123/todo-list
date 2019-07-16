import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject("uiStore", "obStore")
@observer
class Mobx extends Component {
  constructor(props) {
    super(props);

    this.onHandleChangeText = this.onHandleChangeText.bind(this);
  }

  componentDidMount() {
    console.log(this.props);

    setTimeout(() => {
      this.props.uiStore.setLoading(false);
    }, 3000);
  }

  onHandleChangeText() {
    const { setTest } = this.props.obStore;
    const random = Math.random()*1000;

    setTest(random);
  }

  render() {
    const { loading } = this.props.uiStore;
    const { test } = this.props.obStore;

    if(loading) {
      return (
        <div>loading</div>
      )
    }

    return (
      <div className="container">
        <div onClick={this.onHandleChangeText}>{ test }</div>
      </div>
    );
  }
}

export default Mobx;
