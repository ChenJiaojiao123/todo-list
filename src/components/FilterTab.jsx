import React from "react";

//按钮组件
export default class FilterTab extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.defaultValue,    
        };

        this.onChangeSelectFilter = this.onChangeSelectFilter.bind(this);
    }

    onChangeSelectFilter(e) {
        console.log(e.target.value);
        this.setState({
            value:e.target.value
        });

        this.props.onChangeValue(e.target.value);
    }

	render() {
        const { value } = this.state;

		return (
			<div className="radioStyle middleLeft">
				<input type="radio" name="status" value="unfinished" checked={ value === "unfinished" } onChange={this.onChangeSelectFilter} />未完成
				<br />
				<input type="radio" name="status" value="finished" checked={ value === "finished" } onChange={this.onChangeSelectFilter} />已完成
			</div>
		);
	}
}
