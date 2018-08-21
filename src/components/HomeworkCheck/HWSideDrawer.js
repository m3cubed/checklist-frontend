import React, { Fragment } from "react";
import { Link } from "react-router-dom";
//Accessories
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const HWSideDrawer = props => {
	return (
		<Fragment>
			<List>
				<Link to="home">
					<ListItem onClick={() => props.toggleDrawer()}>
						<ListItemText>Main</ListItemText>
					</ListItem>
				</Link>
			</List>
			<Divider />
			<List>
				<Link to="classes">
					<ListItem onClick={() => props.toggleDrawer()}>
						<ListItemText>Classes</ListItemText>
					</ListItem>
				</Link>
			</List>
			<Divider />
		</Fragment>
	);
};

export default HWSideDrawer;
