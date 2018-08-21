import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
//Accessories
import Badge from "@material-ui/core/Badge";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const TemplateDrawer = props => {
	return (
		<List>
			<Link to="/mytemplates/home">
				<ListItem button>
					<ListItemText>Home</ListItemText>
				</ListItem>
			</Link>
			<Divider />
			<Link to="/mytemplates/list">
				<ListItem button>
					<ListItemText>List</ListItemText>
				</ListItem>
			</Link>
		</List>
	);
};

export default TemplateDrawer;
