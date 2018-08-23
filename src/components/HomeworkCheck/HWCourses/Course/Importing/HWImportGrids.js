import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
//Accessories
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Papa from "papaparse";

const styles = theme => ({
	gridCells: {
		flexGrow: 1,
		width: "100%",
		resize: "none",
		height: 20,
		fontSize: "12px",
		margin: 0
	}
});

class HWImportGrids extends Component {
	constructor(props) {
		super(props);
		this.state = { grid: [["", "", ""]] };

		this.csvParse = this.csvParse.bind(this);
	}

	csvParse = (row, column) => e => {
		const newData = Papa.parse(e.target.value).data.filter(
			x => x.length !== 1 && x[0] !== ""
		);
		const { grid } = this.state;

		if (newData.length === 1 && newData[0].length === 1) {
			grid[row][column] = e.target.value;
			this.setState({
				grid
			});
		} else {
			let rowCount = 0;

			for (let i = row; i < newData.length + row; i++) {
				let columnCount = 0;
				for (let j = column; j < 3; j++) {
					try {
						grid[i][j] = newData[rowCount][columnCount];
					} catch (err) {
						grid.push(["", "", ""]);
						grid[i][j] = newData[rowCount][columnCount];
					}
					columnCount++;
				}
				rowCount++;
			}
			this.setState({ grid });
		}
	};

	render() {
		const { classes } = this.props;
		return (
			<React.Fragment>
				<Grid container spacing={0} justify="center">
					<Grid item container xs={12}>
						<Grid item xs={4}>
							<textarea
								className={classes.gridCells}
								value="Student First Name"
								disabled
							/>
						</Grid>
						<Grid item xs={4}>
							<textarea
								className={classes.gridCells}
								value="Student Last Name"
								disabled
							/>
						</Grid>
						<Grid item xs={4}>
							<textarea
								className={classes.gridCells}
								value="Parent's Email(Optional)"
								disabled
							/>
						</Grid>

						{this.state.grid.map((row, rowIndex) => (
							<React.Fragment key={rowIndex}>
								<Grid id={`${rowIndex}-0`} item xs={4}>
									<textarea
										className={classes.gridCells}
										onChange={this.csvParse(rowIndex, 0)}
										value={row[0]}
									/>
								</Grid>
								<Grid id={`${rowIndex}-1`} item xs={4}>
									<textarea
										className={classes.gridCells}
										onChange={this.csvParse(rowIndex, 1)}
										value={row[1]}
									/>
								</Grid>
								<Grid id={`${rowIndex}-2`} item xs={4}>
									<textarea
										className={classes.gridCells}
										onChange={this.csvParse(rowIndex, 2)}
										value={row[2]}
									/>
								</Grid>
							</React.Fragment>
						))}
					</Grid>
				</Grid>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(HWImportGrids);
