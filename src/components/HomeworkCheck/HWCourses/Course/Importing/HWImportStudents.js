import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
//Accessories
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dropzone from "react-dropzone";

//Components
import HWImportGrids from "./HWImportGrids";

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
			import: false
		};
		this.toggleImport = this.toggleImport.bind(this);
	}

	toggleImport = () => {
		this.setState({
			import: !this.state.import
		});
	};

	handleSubmit = () => {};

	render() {
		const { classes } = this.props;
		return (
			<Dialog open={this.props.open} onClose={this.props.toggle("students")}>
				<DialogTitle>Copy or Import from a CSV file.</DialogTitle>
				<DialogContent>
					<DialogContentText style={{ marginBottom: 20 }}>
						{this.state.import
							? null
							: "Copy these columns from your CSV file. You can download a CSV file for your class from TeachAssist. Table cells will be automatically generated."}
					</DialogContentText>
					<hr />
					{this.state.import ? (
						<Dropzone accept="csv">
							{({
								isDragActive,
								isDragReject,
								acceptedFiles,
								rejectedFiles
							}) => {
								if (isDragActive) {
									return "This file is authorized";
								}
								if (isDragReject) {
									return "This file is not authorized";
								}
								return acceptedFiles.length || rejectedFiles.length
									? `Accepted ${acceptedFiles.length}, rejected ${
											rejectedFiles.length
									  } files`
									: "Try dropping some files.";
							}}
						</Dropzone>
					) : (
						<HWImportGrids />
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={this.props.toggle("students")}>Cancel</Button>

					<Button color="primary">Submit</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

export default withStyles(styles)(HWImportStudents);

// <Button color="secondary" onClick={this.toggleImport}>
// Upload CSV
// </Button>
