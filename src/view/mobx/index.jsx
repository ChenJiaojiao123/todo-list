import React, { Component } from 'react';

import NewSection from './newSection';
import NewFooter from './newFooter';

import '../new/new.css';

class Mobx extends Component {
  // constructor(props) {
  //   super(props);

  //   this.onHandleChangeText = this.onHandleChangeText.bind(this);
  // }

  // componentDidMount() {
  //   console.log(this.props);

  //   setTimeout(() => {
  //     this.props.uiStore.setLoading(false);
  //   }, 3000);
  // }

  // onHandleChangeText() {
  //   const { setTest } = this.props.obStore;
  //   const random = Math.random()*1000;

  //   setTest(random);
  // }

  render() {
    // const { loading } = this.props.uiStore;
    // const { test } = this.props.obStore;

    // if(loading) {
    //   return (
    //     <div>loading</div>
    //   )
    // }

    // this.props.obStore.addListItem({
    //   listValue:"打豆豆"
    // });

    return (
      <div className="container">
        {/* <div onClick={this.onHandleChangeText}>{ test }</div> */}
        <header className="header">
					<h1 className="header__title">todos</h1>
				</header>
        <NewSection />
        <NewFooter />
      </div>
    );
  }
}

export default Mobx;
