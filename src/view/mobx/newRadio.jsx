import React from 'react';
import '../../components/Radio/radio.css';

class Radio extends React.Component {
	constructor(props) {
		super(props);
		this.onHandleRadio = this.onHandleRadio.bind(this);
	}

	//当点击对勾时
	onHandleRadio(){
		this.props.onChange();
	}
	
	render() {
		const { checked } = this.props;
		const color = checked ? 'form__item-cb active' : 'form__item-cb';
		return (
      <div className="form__item" onClick={this.onHandleRadio}>
				<span className={color}>✔</span>
			</div>
		);
	}
}

export default Radio;
