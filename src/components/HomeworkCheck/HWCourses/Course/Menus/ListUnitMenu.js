import React, { Component, Fragment } from "react";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
//Accessories
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
//Redux
import { handleDeleteHWUnit } from "../../../../../actions/HomeworkCheck/hwUnits";

const styles = theme => ({
	nestedMenu: {
		paddingLeft: theme.spacing.unit * 2
	}
});

class ListStudentMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openDialog: false
		};
		this.toggleDialog = this.toggleDialog.bind(this);
		this.toggleDialogClose = this.toggleDialogClose.bind(this);
	}

	toggleDialog = () => {
		this.setState({
			openDialog: !this.state.openDialog
		});
	};

	toggleDialogClose = () => {
		this.setState(
			{
				openDialog: false
			},
			() => this.props.toggle()
		);
	};

	handleDelete = () => {
		this.setState(
			{
				openDialog: false
			},
			() => {
				this.props.dispatch(handleDeleteHWUnit(this.props.target));
				this.props.toggle();
			}
		);
	};

	render() {
		const { anchorEl, open, toggle } = this.props;
		return (
			<Fragment>
				<Dialog open={this.state.openDialog} onClose={this.toggleDialog}>
					<DialogContent>
						<DialogContentText>
							Are you sure you want to delete this unit? All the data attached
							to it will be deleted.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.toggleDialogClose}>No</Button>
						<Button color="primary" onClick={this.handleDelete}>
							Yes
						</Button>
					</DialogActions>
				</Dialog>
				<Menu id="unit-menu" anchorEl={anchorEl} open={open} onClose={toggle}>
					<MenuItem onClick={this.toggleDialog}>Delete</MenuItem>
				</Menu>
			</Fragment>
		);
	}
}

export default compose(
	withStyles(styles),
	connect()
)(ListStudentMenu);
