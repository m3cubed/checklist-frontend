import React, { Component } from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
//Accessories
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
//Redux
import { toggleStudent } from "../../../actions/sendToList";
import { receiveList } from "../../../actions/sendToList";

const styles = theme => ({
	root: {
		overflow: "scroll"
	}
});

class CourseViewConfirmed extends Component {
	state = {
		data: this.props.data
	};

	componentDidMount() {
		this.props.dispatch(
			receiveList(
				this.props.confirmed.reduce((acc, key) => {
					acc[key] = true;
					return acc;
				}, {})
			)
		);
	}

	render() {
		const { data } = this.state;
		const { classes } = this.props;

		return (
			<Paper className={classes.root}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>First Name</TableCell>
							<TableCell>Last Name</TableCell>
							<TableCell>Send?</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((student, i) => (
							<TableRow key={student.id}>
								<TableCell component="th" scope="row">
									{student.firstName}
								</TableCell>
								<TableCell>{student.lastName}</TableCell>
								<TableCell>
									<Button
										variant="contained"
										color={student.send ? "default" : "secondary"}
										onClick={() => {
											data[i].send = !data[i].send;
											this.setState({ data });
											this.props.dispatch(toggleStudent(student.id));
										}}
									>
										Send
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Paper>
		);
	}
}

function mapStateToProps({ students }, { confirmed }) {
	let list = [];

	confirmed.forEach(item => {
		list.push({
			firstName: students[item].userFirstName,
			lastName: students[item].userLastName,
			send: true,
			id: students[item].id
		});
	});

	return {
		data: list
	};
}

export default compose(
	withStyles(styles),
	connect(mapStateToProps)
)(CourseViewConfirmed);
