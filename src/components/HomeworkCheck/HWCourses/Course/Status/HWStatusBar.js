import React, { Component } from "react";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
//Accessories
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
//Icons
import AddIcon from "@material-ui/icons/Add";

class HWStatusBar extends Component {
	state = {};
	render() {
		const { hwStatus } = this.props;
		return (
			<Paper>
				<Grid container alignItems="center" justify="flex-start">
					{Object.keys(hwStatus).map(item => (
						<Chip
							key={item}
							label={hwStatus[item].statusTitle}
							style={{
								backgroundColor: hwStatus[item].color,
								width: 100,
								margin: 5
							}}
						/>
					))}
					<Chip
						key="add"
						label="Add a Status"
						onClick={this.props.add}
						avatar={
							<Avatar>
								<AddIcon />
							</Avatar>
						}
					/>
				</Grid>
			</Paper>
		);
	}
}

function mapStateToProps({ hwStatus }) {
	return {
		hwStatus
	};
}

export default connect(mapStateToProps)(HWStatusBar);
