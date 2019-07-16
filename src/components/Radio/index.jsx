import React from 'react';
import './radio.css';

export default class Radio extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			checked: this.props.checked || false,
			perviewChecked: this.props.checked
		};
		this.onHandleRadio = this.onHandleRadio.bind(this);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.checked === this.props.checked) {
			return null;
		} else {
			this.setState({
        checked: this.props.checked
      })
		}
	}

	// onHandleRadio() {
	// 	const { onChange, value, name } = this.props;
	// 	const { checked } = this.state;

	// 	this.setState(
	// 		{
	// 			checked: !checked
	// 		},
	// 		() => {
	// 			onChange({
	// 				value,
	// 				name,
	// 				checked: this.state.checked
	// 			});
	// 		}
	// 	);
	// }

	//当点击对勾时
	onHandleRadio(){
		const { checked } = this.state;
		this.setState(
			{
				checked: !checked
			}
		);
		this.props.onChange();
	}

	render() {
		const { checked } = this.state;
		const color = checked ? 'form__item-cb active' : 'form__item-cb';

		return (
			<div className="form__item" onClick={this.onHandleRadio}>
				<span className={color}>✔</span>
			</div>
		);
	}
}


	// static getDerivedStateFromProps(props, state) {
	//   const { perviewChecked } = state;
	//   console.log("1", props);
	//   console.log("2", state);

	//   if(props.checked === perviewChecked) {
	//     return null;
	//   } else {
	//     return {
	//       checked: props.checked,
	//       perviewChecked: props.checked
	//     }
	//   }
	// }