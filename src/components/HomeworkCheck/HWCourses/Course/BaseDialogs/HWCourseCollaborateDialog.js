import React, { Component } from "react";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { CONNECTION } from "../../../../../config/config";
//Accessories
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
//Icons
import PersonIcon from "@material-ui/icons/Person";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import { toggleCollaborateMenu } from "../../../../../actions/PageStates/page_hwCheckCourse";
import { handleAddCollaborator } from "../../../../../actions/HomeworkCheck/collaborate";

class HWCourseCollaborateDialog extends Component {
	state = {
		email: "",
		user: null,
		notFound: false,
		canView: false,
		canEdit: false,
	};

	addCollaborator = () => {
		const collaborator = {
			courseID: this.props.courseID,
			collaborator_id: this.state.user.id,
			can_view: this.state.canView,
			can_edit: this.state.canEdit,
		};
		this.props.dispatch(handleAddCollaborator(collaborator));
		this.closeDialog();
	};

	searchForUser() {
		const { email } = this.state;
		fetch(`${CONNECTION}/user/search_for_user`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email }),
		})
			.then(res => res.json())
			.then(json => {
				if (json.completed) {
					this.setState({
						notFound: false,
						user: json.user,
					});
				} else {
					this.setState({ notFound: true });
				}
			});
	}

	toggleViewEdit = type => e => {
		if (type === "canEdit") {
			this.setState({
				canView: true,
				canEdit: true,
			});
		} else if (
			type === "canView" &&
			this.state.canView === true &&
			this.state.canEdit === true
		) {
			this.setState({
				canView: false,
				canEdit: false,
			});
		}
		this.setState({ [type]: !this.state[type] });
	};

	closeDialog = () => {
		this.props.dispatch(toggleCollaborateMenu());
	};

	render() {
		const { collaborateMenu } = this.props;

		return (
			<Dialog open={collaborateMenu} onClose={this.closeDialog}>
				<DialogTitle>Search by Email</DialogTitle>

				<DialogContent>
					<DialogContentText>
						Type the email of the person you want to collaborate with!
					</DialogContentText>
					<Grid container style={{ marginTop: 10 }}>
						<Grid item xs={10}>
							<TextField
								fullWidth
								onChange={e => this.setState({ email: e.target.value })}
							/>
						</Grid>
						<Grid item xs={2}>
							<Button onClick={this.searchForUser.bind(this)}>Search</Button>
						</Grid>
					</Grid>

					{this.state.notFound ? (
						<DialogContentText style={{ marginTop: 15 }}>
							No user with such email found!
						</DialogContentText>
					) : null}
					{this.state.user === null ? null : (
						<Paper style={{ marginTop: 15 }}>
							<List>
								<ListItem>
									<ListItemIcon>
										<PersonIcon />
									</ListItemIcon>
									<ListItemText>
										{this.state.user.userFirstName}{" "}
										{this.state.user.userLastName}
									</ListItemText>
									<ListSecondaryAction>
										<IconButton
											onClick={this.toggleViewEdit("canView")}
											color={this.state.canView ? "primary" : "secondary"}
										>
											<VisibilityIcon />
										</IconButton>

										<IconButton
											onClick={this.toggleViewEdit("canEdit")}
											color={this.state.canEdit ? "primary" : "secondary"}
										>
											<EditIcon />
										</IconButton>
									</ListSecondaryAction>
								</ListItem>
							</List>
						</Paper>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={this.closeDialog}>Cancel</Button>

					<Button
						onClick={this.addCollaborator.bind(this)}
						color="primary"
						disabled={
							this.state.canView === false && this.state.canEdit === false
						}
					>
						Add
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

function mapStateToProps({ page_hwCheckCourse }) {
	return {
		collaborateMenu: page_hwCheckCourse.collaborateMenu,
	};
}

export default connect(mapStateToProps)(HWCourseCollaborateDialog);
