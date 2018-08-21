import React, { Component } from "react";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
//Accessories
import ReactDataSheet from "react-datasheet";
import "react-datasheet/lib/react-datasheet.css";

const styles = theme => ({
	root: {
		flexGrow: 1
	}
});

class HWCourseStudentAddTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			grid: [[{ value: 1 }, { value: 3 }], [{ value: 2 }, { value: 4 }]]
		};
	}
	render() {
		return (
			<ReactDataSheet
				data={this.state.grid}
				valueRenderer={cell => cell.value}
				onCellsChanged={changes => {
					const grid = this.state.grid.map(row => [...row]);
					changes.forEach(({ cell, row, col, value }) => {
						grid[row][col] = { ...grid[row][col], value };
					});
					this.setState({ grid });
				}}
			/>
		);
	}
}

export default compose(connect())(HWCourseStudentAddTable);
