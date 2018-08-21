import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import compose from "recompose/compose";
//Accessories
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
//Redux
import { handleDeleteTemplate } from "../../../actions/templates";
//Components
import TemplateCreator from "../TemplateCreator";

const styles = theme => ({
	root: {
		width: "70%",
		marginTop: theme.spacing.unit * 3,
		overflowX: "auto"
	},
	table: {
		minWidth: 700
	}
});

class TemplateList extends Component {
	render() {
		const { templates, dispatch, classes } = this.props;
		if (templates === null) {
			return (
				<div>
					<span>Add a new template now!</span>
				</div>
			);
		}

		return (
			<div>
				<TemplateCreator />
				<Paper className={classes.root}>
					<Table className={classes.table}>
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell padding="checkbox">Delete</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{Object.keys(templates).map(template => {
								return (
									<TableRow key={template}>
										<TableCell scope="row">
											<Link to={`template/${template}`}>
												{templates[template].templateTitle}
											</Link>
										</TableCell>
										<TableCell padding="checkbox">
											<Button
												onClick={() =>
													dispatch(handleDeleteTemplate(templates[template]))
												}
											>
												<DeleteIcon />
											</Button>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</Paper>
			</div>
		);
	}
}

function mapStateToProps({ templates }) {
	const data = [];
	Object.keys(templates).forEach(item => {
		data.push({
			id: item,
			title: templates[item].templateTitle
		});
	});

	if (Object.keys(templates).length === 0) {
		return { templates: null };
	}
	return {
		templates,
		data
	};
}

export default compose(
	connect(mapStateToProps),
	withStyles(styles)
)(TemplateList);
