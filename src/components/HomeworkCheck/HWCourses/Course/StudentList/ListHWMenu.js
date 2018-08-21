import React, { Component } from "react";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
//Accessories
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Collapse from "@material-ui/core/Collapse";
import MenuList from "@material-ui/core/MenuList";
//Icons
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const styles = theme => ({
	nestedMenu: {
		paddingLeft: theme.spacing.unit * 2
	}
});

class ListHWMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openStatusMenu: false
		};

		this.changeAll = this.changeAll.bind(this);
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

	render() {
		const { anchorEl, open, toggle, hwStatus, classes } = this.props;
		return (
			<Menu
				id="HW-header-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={toggle()}
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
				<MenuItem>2</MenuItem>
			</Menu>
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
