import React, { Component, Fragment } from "react";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
//Accessories
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Collapse from "@material-ui/core/Collapse";
import MenuList from "@material-ui/core/MenuList";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
//Icons
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
//Redux
import { handleDeleteHomework } from "../../../../../actions/HomeworkCheck/homeworks";

const styles = theme => ({
	nestedMenu: {
		paddingLeft: theme.spacing.unit * 2
	}
});

class ListHWMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openDialog: false,
			openStatusMenu: false
		};

		this.changeAll = this.changeAll.bind(this);
		this.toggleDialog = this.toggleDialog.bind(this);
		this.toggleDialogClose = this.toggleDialogClose.bind(this);
	}

	toggleStatusChoiceMenu = () => {
		this.setState(state => ({
			openStatusMenu: !state.openStatusMenu
		}));
	};

	changeAll = status => () => {
		this.setState({
			openStatusMenu: false
		});
		this.props.change(status);
	};

	toggleDialog = () => {
		this.setState({
			openDialog: !this.state.openDialog
		});
	};

	toggleDialogClose = () => {
		this.setState(
			{
				openDialog: !this.state.openDialog
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
				this.props.dispatch(handleDeleteHomework(this.props.target));
				this.props.toggle();
			}
		);
	};

	render() {
		const { anchorEl, open, toggle, hwStatus, classes } = this.props;
		return (
			<Fragment>
				<Dialog open={this.state.openDialog} onClose={this.toggleDialogClose}>
					<DialogContent>
						<DialogContentText>
							Are you sure you want to delete this homework? All the data
							attached to it will be deleted.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.toggleDialog}>No</Button>
						<Button color="primary" onClick={this.handleDelete}>
							Yes
						</Button>
					</DialogActions>
				</Dialog>
				<Menu
					id="HW-header-menu"
					anchorEl={anchorEl}
					open={open}
					onClose={toggle}
				>
					<MenuItem onClick={this.toggleStatusChoiceMenu}>
						Fill All
						{this.state.openStatusMenu ? <ExpandLess /> : <ExpandMore />}
					</MenuItem>
					<Collapse
						className={classes.nestedMenu}
						in={this.state.openStatusMenu}
						timeout="auto"
						unmountOnExit
					>
						<MenuList>
							{Object.keys(hwStatus).map(item => (
								<MenuItem key={item} onClick={this.changeAll(item)}>
									{item}
								</MenuItem>
							))}
						</MenuList>
					</Collapse>
					<MenuItem onClick={this.toggleDialog}>Delete</MenuItem>
				</Menu>
			</Fragment>
		);
	}
}

function mapStateToProps({ hwStatus }) {
	return { hwStatus };
}

export default compose(
	withStyles(styles),
	connect(mapStateToProps)
)(ListHWMenu);
