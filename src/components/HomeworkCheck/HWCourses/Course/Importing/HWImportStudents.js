import React, { Component } from "react";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
//Accessories
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dropzone from "react-dropzone";
import Papa from "papaparse";

//Components
import HWImportGrids from "./HWImportGrids";
import { handleSubmitMultipleStudents } from "../../../../../actions/HomeworkCheck/hwStudents";

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

class HWImportStudents extends Component {
	constructor(props) {
		super(props);
		this.state = {
			import: true
		};

		this.toggleImport = this.toggleImport.bind(this);
		this.onDrop = this.onDrop.bind(this);
		this.handleGrid = this.handleGrid.bind(this);
	}

	toggleImport = () => {
		this.setState({
			import: !this.state.import,
			grid: null
		});
	};

	handleGrid = grid => {
		this.setState({
			grid
		});
	};

	onDrop = e => {
		const reader = new FileReader();
		reader.readAsText(e.target.files[0]);
		reader.onload = e => {
			const csv = Papa.parse(reader.result)
				.data.slice(1)
				.map(x => {
					x = x.slice(0, 4);
					return x;
				})
				.filter(y => y.length !== 1 && y[0] !== "");

			this.setState({
				import: false,
				grid: csv
			});
		};
	};

	handleSubmit = () => {
		if (this.state.grid !== null) {
			this.props.dispatch(
				handleSubmitMultipleStudents(this.state.grid, this.props.courseID)
			);
		}
	};

	render() {
		const { classes } = this.props;

		return (
			<Dialog open={this.props.open} onClose={this.props.toggle("students")}>
				<DialogTitle>Copy or Import from a CSV file.</DialogTitle>
				<DialogContent>
					<DialogContentText style={{ marginBottom: 20 }}>
						{this.state.import
							? "Browse your folders for a CSV file. You can download a CSV file for your class from TeachAssist. Table cells will be automatically generated."
							: "Copy these columns from your CSV file. You can download a CSV file for your class from TeachAssist. Table cells will be automatically generated."}
					</DialogContentText>
					<hr />
					{this.state.import ? (
						<Grid container justify="center" alignItems="center">
							<input
								style={{ display: "none" }}
								accept=".csv"
								id="file"
								type="file"
								onChange={this.onDrop}
							/>
							<label htmlFor="file">
								<Button
									component="span"
									className={classes.button}
									variant="raised"
								>
									Upload CSV
								</Button>
							</label>
						</Grid>
					) : (
						<HWImportGrids
							grid={this.state.grid}
							handleGrid={this.handleGrid}
						/>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={this.props.toggle("students")}>Cancel</Button>
					<Button color="secondary" onClick={this.toggleImport}>
						{this.state.import ? "Copy and Paste" : "Upload A CSV"}
					</Button>
					<Button onClick={this.handleSubmit} color="primary">
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

export default compose(
	withStyles(styles),
	connect()
)(HWImportStudents);

// <Button color="secondary" onClick={this.toggleImport}>
// Upload CSV
// </Button>
