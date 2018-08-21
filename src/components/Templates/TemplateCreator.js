import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddTemplate } from "../../actions/templates";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class TemplateCreator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			templateTitle: "",
			dialog: false
		};
		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState({
			dialog: !this.state.dialog
		});
	}

	handleSubmit = e => {
		e.preventDefault();
		if (this.state.templateTitle === "") {
			alert("You can't have an empty title!");
		} else if (
			this.props.templateTitles &&
			this.props.templateTitles.includes(this.state.templateTitle)
		) {
			alert("You already have a template with that title!");
		} else {
			const { userLastName, userFirstName, id } = this.props.authUser;
			const { dispatch } = this.props;
			const template = {
				...this.state,
				creator: `${userLastName}, ${userFirstName}`,
				creatorID: `${id}`
			};
			dispatch(handleAddTemplate(template));
			this.setState({
				templateTitle: ""
			});
		}
	};

	render() {
		return (
			<div>
				<Button onClick={this.toggle}>Create!</Button>

				<Dialog
					open={this.state.dialog}
					onClose={this.toggle}
					onBackdropClick={this.toggle}
				>
					<DialogTitle>Create a new template!</DialogTitle>

					<DialogContent>
						<DialogContentText>
							Input a title for your new template.
						</DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							fullWidth
							type="text"
							onChange={e => this.setState({ templateTitle: e.target.value })}
						/>
					</DialogContent>

					<DialogActions>
						<Button onClick={this.toggle}>Cancel</Button>
						<Button onClick={this.handleSubmit}>Create</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

function mapStateToProps({ templates, authUser }) {
	if (Object.keys(templates).length > 0) {
		return {
			templateTitles: Object.keys(templates).map(
				template => templates[template].templateTitle
			),
			authUser
		};
	}
	return { authUser };
}

export default connect(mapStateToProps)(TemplateCreator);
